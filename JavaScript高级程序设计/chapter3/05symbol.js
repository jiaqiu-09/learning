// case 1 全局符号注册表
let sym1 = Symbol.for('Global')
let sym2 = Symbol.for('Global')
console.log(sym1)
console.log(sym1 === sym2)

// case 2 Symbol.for() 不传参
let sym3 = Symbol.for()
console.log(sym3)

// case 3 Symbol.keyFor()
console.log(Symbol.keyFor(sym1))

// case 4 Symbol 作为key
let sym4 = Symbol('key1')
let sym5 = Symbol('key2')

let o = {
  [sym4]: 'value1',
  [sym5]: 'value2',
  'key3': 'value3',
  'key4': 'value4'
}
// [Symbol(key1), Symbol(key2)]
console.log(Object.getOwnPropertySymbols(o))
// [ 'key3', 'key4' ]
console.log(Object.getOwnPropertyNames(o))
// { 'key3': {...}, 'key4': {...}, Symbol(key1): {...}, Symbol(key2): {...} }
console.log(Object.getOwnPropertyDescriptors(o))
// [ 'key3', 'key4', Symbol(key1), Symbol(key2) ]
console.log(Reflect.ownKeys(o))
console.log(sym4.toString())

// case 5 Symbol.hasInstance
function Foo() {}
let a = new Foo()
console.log(Foo[Symbol.hasInstance](a))
console.log(a instanceof Foo)

// case 6 
class Emitter {
  constructor(max) {
    this.max = max
    this.idx = 0
  }

  *[Symbol.iterator]() {
    while (this.idx < this.max) {
      yield this.idx++
    }
  }
}

function count() {
  let a = new Emitter(5)
  for (let i of a) {
    console.log(i)
  }
}
count()

// case 6 Symbol.toPrimitive
// 改变 默认行为
class Bar {
  constructor() {
    this[Symbol.toPrimitive] = function (hint) {
      switch(hint) {
        case 'string':
          return 'I,m string'
        case 'number':
          return 200
        case 'default':
          return 'default bar'
      }
    }
  }
}

let a1 = new Bar()
console.log(a1 + ' spp')
console.log(a1 - 10)
console.log(String(a1))