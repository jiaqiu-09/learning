<template>
  <div class="hello">
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    // case 1
    // 4000001
    // const workerScript = `
    // self.onmessage = ({data}) => {
    // console.log('data: ', data);
    // // 执行 1 000 000 次加操作
    // for (let i = 0; i < 1E6; ++i) {
    // // 线程不安全加操作会导致资源争用
    // // data[0] += 1;
    // Atomics.add(data, 0, 1);
    // }
    // self.postMessage(null);
    // };
    // `;
    // const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
    // // 创建容量为 4 的工作线程池
    // const workers = [];
    // for (let i = 0; i < 4; ++i) {
    //   workers.push(new Worker(workerScriptBlobUrl));
    // }
    // // 在最后一个工作线程完成后打印出最终值
    // let responseCount = 0;
    // for (const worker of workers) {
    //   console.log('--- ', worker)
    //   worker.onmessage = () => {
    //     console.log('responseCount: ', responseCount)
    //     if (++responseCount == workers.length) {
    //       console.log(`Final buffer value: ${view[0]}`);
    //     }
    //   };
    // }
    // // eslint-disable-next-line
    // console.log('crossOriginIsolated: ', crossOriginIsolated)
    // // 初始化 SharedArrayBuffer
    // // eslint-disable-next-line
    // const sharedArrayBuffer = new SharedArrayBuffer(4);
    // const view = new Uint32Array(sharedArrayBuffer);
    // view[0] = 1;
    // // 把 SharedArrayBuffer 发送到每个工作线程
    // for (const worker of workers) {
    //   worker.postMessage(view);
    // }
    // //（期待结果为 4000001。实际输出可能类似这样：）
    // // Final buffer value: 2145106

    // ---------------gap line -------------------------
    // case 2
    // await notify
    const workerScript = `
    self.onmessage = ({data}) => {
      // const view = new Int32Array(data);
      console.log('Waiting to obtain lock', data); 
      // 遇到初始值则停止，10 000 毫秒超时
      Atomics.wait(data, 0, 0, 1E5); 
      console.log('Obtained lock');
      // 在索引 0 处加 1
      Atomics.add(data, 0, 1);
      console.log('Releasing lock');
      // 只允许 1 个工作线程继续执行
      Atomics.notify(data, 0, 1);
      self.postMessage(null);
    };
    `;
    const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
    // 创建容量为 4 的工作线程池
    const workers = [];
    for (let i = 0; i < 4; ++i) {
      workers.push(new Worker(workerScriptBlobUrl));
    }
    // 在最后一个工作线程完成后打印出最终值
    let responseCount = 0;
    for (const worker of workers) {
      worker.onmessage = () => {
        console.log('responseCount: ', responseCount)
        if (++responseCount == workers.length) {
          console.log(`Final buffer value: ${view[0]}`);
        }
      };
    }
    // eslint-disable-next-line
    console.log('crossOriginIsolated: ', crossOriginIsolated)
    // 初始化 SharedArrayBuffer
    // eslint-disable-next-line
    const sharedArrayBuffer = new SharedArrayBuffer(8);
    const view = new Uint32Array(sharedArrayBuffer);
    // 把 SharedArrayBuffer 发送到每个工作线程
    for (const worker of workers) {
      worker.postMessage(sharedArrayBuffer);
    }
    // 1000 毫秒后释放第一个锁
    // eslint-disable-next-line
    setTimeout(() => Atomics.notify(view, 0, 1), 1000);
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
