// case 1
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

async function foo() {
  const t0 = Date.now()
  await sleep(1500)
  console.log(Date.now() - t0)
}

foo()

// case 2 并行
async function randomDelay(id) {
  const delay = Math.random() * 1000
  return new Promise((resolve) => setTimeout(() => {
    console.log(`${id} finished + delay: ${delay}ms`)
    resolve()
  }, delay))
}

async function foo1() {
  const t0 = Date.now()
  await randomDelay(0)
  await randomDelay(1)
  await randomDelay(2)
  await randomDelay(3)
  await randomDelay(4)
  console.log(`${Date.now() - t0}ms delayed`)
}

foo1()

async function foo2() {
  const t0 = Date.now()
  const p0 = randomDelay(10)
  const p1 = randomDelay(11)
  const p2 = randomDelay(12)
  const p3 = randomDelay(13)
  const p4 = randomDelay(14)
  await p0
  await p1
  await p2
  await p3
  await p4
  console.log(`${Date.now() - t0}ms delayed foo2`)
}

foo2()