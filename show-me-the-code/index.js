// 1、实现原生 ajax
const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      console.log('state get', xhr.readyState)
      if (xhr.readyState == 4) {
        console.log('xhr', xhr)
        fn(xhr.responseText)
      }
    }
    xhr.send()
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      console.log('state post', xhr.readyState)
      if (xhr.readyState == 4) {
        console.log('xhr', xhr)
        fn(xhr.responseText)
      }
    }
    xhr.send(data)
  }
}

// ajax.get('./test.json', function(response) {
//   console.log('response get', response)
// })

// ajax.post('./test.json', Qs.stringify({name: 'xxx'}), function(response) {
//   console.log('response post', response)
// })

// ajax.post('./test.json', 'name=xxx&age=dsa', function(response) {
//   console.log('response post', response)
// })


// 2、手写 new
// function myNew(fn, args) {
//   console.log(fn.prototype.constructor.name)
//   const newObj = Object.create(fn.prototype)
//   const result = fn.apply(newObj, args)
//   console.log('result', result)
//   console.log('newObj', newObj)
//   return typeof result === 'object' ? result : newObj;
// }

// function TestNew (age, name) {
//   this.age = age
//   this.name = name || 'hello'
//   return {
//     name: name + 'xx'
//   }
// }

// let test01 = myNew(TestNew, [20, 'hello'])
// let test02 = myNew(TestNew, [21, 'world'])
// console.log('test01', test01)
// console.log('test02', test02)

// let test03 = new TestNew(22, 'hello1')
// let test04 = new TestNew(23, 'world1')
// console.log('test03', test03)
// console.log('test04', test04)

// 3、防抖
// function debounce(fn, delay = 500) {
//   console.log('timer', window.timer)
//   return function () {
//     console.log('11', window.timer)
//     if (window.timer) {
//         clearTimeout(window.timer)
//     }
//     const args = arguments        
//     window.timer = setTimeout(() => {
//         fn.apply(this, args) // 改变this指向为调用debounce所指的对象
//     }, delay)
//   }
// }

// function testDebounce() {
//   console.log('222')
// }

// debounce(testDebounce)()
// debounce(testDebounce)()
// debounce(testDebounce)()
// debounce(testDebounce)()
// debounce(testDebounce)()
// debounce(testDebounce)()

// 4、节流
// function throttle(fn, delay = 2000) {
//   return function () {
//     if (window.flag) {
//       return
//     }
//     window.flag = true
//     window.timer = setTimeout(function () {
//       window.flag = false
//       fn()
//     }, delay)
//   }
// }

// function testThrottle() {
//   console.log('333' + new Date())
// }

// setInterval(() => {
//   throttle(testThrottle)()
// })

// 5、数组去重
// function arrShake(arr) {
//   if (Object.prototype.toString.call(arr) !== '[object Array]') {
//     return
//   }
//   return arr.sort().reduce((pre, curr) => {
//     console.log('pre', pre, curr)
//     if (pre && pre[pre.length - 1] !== curr) {
//       pre.push(curr)
//     }
//     return pre
//   }, [])
// }

// let arr1 = [8,1,2,3,3,3,55,1]
// console.log(arrShake(arr1))

// 6、用setInterval实现setTimeout
// function myInterval (fn, delay = 2000) {
//   interval = () => {
//     if (!window.timer) {
//       window.timer = setTimeout(function () {
//         fn()
//         window.timer = null
//         myInterval(fn, delay)
//       }, delay)
//     }
//   }
//   interval()
//   return {
//     cancel: () => {
//       clearTimeout(window.timer)
//       window.timer = 2
//     }
//   }
// }

// function testInterval () {
//   console.log('000' + new Date())
// }

// const {cancel} = myInterval(testInterval)

// setTimeout(() => {
//   cancel()
// }, 7000)

// 7、用setInterval实现setTimeout
// function myTimeOut (fn, delay = 2000) {
//   if (!window.timer) {
//     window.timer = setInterval(function() {
//       fn()
//       clearInterval(window.timer)
//     }, delay)
//   }
// }

// function testTimeout () {
//   console.log(new Date())
// }

// console.log(new Date())
// myTimeOut(testTimeout, 3000)

// 8、实现一个compose
// function fn1(x) {
//   return x + 1;
// }
// function fn2(x) {
//   return x * 2;
// }
// function fn3(x) {
//   return x * 3;
// }
// function fn4(x) {
//   return x * 4;
// }

// function compose (...fns) {
//   return (val) => {
//     return fns.reduce((pre, curr) => {
//       return curr(pre)
//     }, val)
//   }
// }

// let a = compose(fn1, fn2, fn3, fn4)(0)
// console.log('a', a)

// 9、实现一个科里化函数
// function myCurry(fn) {
//   return function curried(...args) {
//     if (args.length >= fn.length) {
//       // return fn.apply(this, args)
//       return fn(...args)
//     } else {
//       return function temp(...args2) {
//         return curried(...args.concat(args2))
//       }
//     }
//   }
// }

// function sum (a, b, c) {
//   return a + b + c
// }

// let _sum = myCurry(sum)
// console.log(_sum(2, 4, 5))
// console.log(_sum(2)(4)(5))
// console.log(_sum(2)(4, 5))


// test RXJS
// var button = document.querySelector('button')
// rxjs.fromEvent(button, 'click').subscribe(s => console.log('sss', s))

// // stream$尾部的$是表示当前这个变量是个observable
// const stream$ = new rxjs.Observable(subscriber => {
//   setTimeout(() => {
//     console.log("time: ", new Date())
//     subscriber.next([1, 2, 3]);
//   }, 2000);
//   setTimeout(() => {
//     console.log("time: ", new Date())
//     subscriber.next({ a: 1000 });
//   }, 3000);
//   setTimeout(() => {
//     console.log("time: ", new Date())
//     subscriber.next("end");
//   }, 4000);
//   setTimeout(() => {
//     console.log("time: ", new Date())
//     subscriber.complete();
//   }, 5000);
// });
// console.log("time: ", new Date())

// // 启动流
// const subscription = stream$.subscribe({
//   complete: () => console.log("done"),
//   next: v => console.log(v),
//   error: () => console.log("error")
// });


// // 创建subject
// const subject = new rxjs.Subject();

// // 订阅一个observer
// subject.subscribe(v => console.log("stream 1", v));
// // 再订阅一个observer
// subject.subscribe(v => console.log("stream 2", v));
// // 延时1s再订阅一个observer
// setTimeout(() => {
//   subject.subscribe(v => console.log("stream 3", v));
// }, 1000);
// // 产生数据1
// subject.next(1);
// // 产生数据2
// subject.next(2);
// // 延时3s产生数据3
// setTimeout(() => {
//   subject.next(3);
// }, 3000);

// function foo(str) {
//   // "use strict";
//   eval( str );
//   console.log( a ); // ReferenceError: a is not defined
// }
// foo( "var a = 2");

// function foo(obj) {
//   with (obj) {
//       a = 2;
//   }
// }

// var o1 = {
//   a: 3
// };

// var o2 = {
//   b: 3
// };

// foo( o1 );
// console.log( o1.a ); // 2
// foo( o2 );
// console.log( o2.a ); // undefined
// console.log( a ); // 2——不好，a被泄漏到全局作用域上了！

// let obj = {
//   a: 2,
//   b: 3
// }

// with (obj) {
//   a = 3;
//   b = 6
// }

// console.log('aa', obj.a)
// console.log('bb', obj.b)

// 扁平转 tree
// let arr = [
//   {id: 1, name: '部门1', pid: 0},
//   {id: 2, name: '部门2', pid: 1},
//   {id: 3, name: '部门3', pid: 1},
//   {id: 4, name: '部门4', pid: 3},
//   {id: 5, name: '部门5', pid: 4},
// ]

// function getTree(arr, result, pid) {
//   // for(let i = 0; i < arr.length; i ++) {
//   //   if (arr[i].pid == pid) {
//   //     const newItem = {...arr[i], children: []};
//   //     result.push(newItem);
//   //     getTree(arr, newItem.children, arr[i].id);
//   //   }
//   // }
//   for(item of arr) {
//     if (item.pid == pid) {
//       let newItem = {...item, children: []}
//       result.push(newItem)
//       getTree(arr, newItem.children, item.id)
//     }
//   }
// }

// const arrayToTree = (data, pid) => {
//   const result = [];
//   getTree(data, result, pid)
//   return result;
// }

// console.log(arrayToTree(arr, 0))

// 异或交换

// let a = 100, b = -19
// a = a^b
// b = a^b
// a = a^b
// console.log(a, b)


// var person = {
//   name: "张三"
// };

// var proxy = new Proxy(person, {
//   get: function(target, propKey, receiver) {
//     console.log(receiver)
//     // console.log('receiver: ' + receiver)
//     if (propKey in target) {
//       // console.log('receiver: ' + receiver)
//       // console.log(target, propKey, receiver)
//       return target[propKey];
//       // return receiver;
//     } else {
//       throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
//     }
//   }
// });

// proxy.name // "张三"
// console.log('xxx', proxy)
// console.log('xxx' + proxy)
// console.log(proxy)
// console.log(Reflect.ownKeys(proxy))
// console.log(typeof Reflect.ownKeys(proxy)[0])

// foo(); // "b"
// if (a) {
//   function foo() { console.log("a"); }
// } else {
//   function foo() { console.log("b"); }
// }
// var a = true;

// for (var i = 0; i <= 5; i++) {
//   setTimeout(function () {
//     console.log('i: ' + i)
//   }, 1000 * i)
// }

// for (var i = 0; i <= 5; i++) {
//   (function () {
//     setTimeout(function () {
//       console.log('i: ' + i)
//     }, 1000 * i)
//   })()
// }

// for (var i = 0; i <= 5; i++) {
//   (function (j) {
//     setTimeout(function () {
//       console.log('i: ' + j)
//     }, 1000 * j)
//   })(i)
// }

// foo(); // 3
// function foo() {
//     console.log( 1 );
// }
// var foo = function() {
//   console.log( 2 );
// };
// function foo() {
//   console.log( 3 );
// }

var foo = (function CoolModule(id) {
  function change() {
    // 修改公共API
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log(id);
  }

  function identify2() {
    console.log(id.toUpperCase());
  }

  var publicAPI = {
    change: change,
    identify: identify1
  };

  return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE