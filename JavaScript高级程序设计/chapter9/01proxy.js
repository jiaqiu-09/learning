// case 1
const target = {}
Object.defineProperty(target, 'foo', {
  configurable: false,
  writable: false,
  value: 'bar'
})

const handler = {
  // no error
  // get(target, key, receiver) {
  //   return Reflect.get(...arguments)
  // }
  // no error 
  // get() {
  //   return 'bar'
  // }
  // error
  get() {
    return 'bar 2'
  }
}

const proxy1 = new Proxy(target, handler)
// console.log(proxy1.foo) // error 

// case 2 revocable proxy
console.log('case 2 revocable proxy')
const target2 = {
  foo: 'bar'
}
const handler2 = {
  get() {
    return 'adas'
  }
}

const { proxy, revoke } = Proxy.revocable(target2, handler2)
console.log(proxy.foo) // adas
console.log(target2.foo) // bar

revoke()
// console.log(proxy.foo) // error

// case 3 reflect 方法返回状态标记
console.log('case 3 reflect 方法返回状态标记')
const o = {}
if (Reflect.defineProperty(o, 'foo', {value: 'bar'})) {
  console.log('defineProperty success')
} else {
  console.log('defineProperty fail')
}

// case 4 无法代理 new Date()
console.log('case 4 无法代理 new Date()')
const target3 = new Date()
const proxy3 = new Proxy(target3, {})
console.log(proxy3 instanceof Date) // true
// proxy.getDate() // error

// case 5 test
console.log('case 5 test')
const target5 = { name: 'ad' }
Reflect.deleteProperty(target5, 'name')
console.log(target5)

// case 6 Reflect.set
console.log('case 6 Reflect.set')
const target6 = []
function added(val) {
  console.log('val ', val)
}
const proxy6 = new Proxy(target6, {
  set(target, propertyKey, val, receiver) {
    const result = Reflect.set(...arguments)
    console.log('set :', result)
    if (result) {
      added(val)
    }
    return result
  }
})

proxy6.push('hello')
proxy6.push('')
proxy6.push(0)
console.log('target6 :', target6)