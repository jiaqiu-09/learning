// case 1
class Person1 {
  static hello() {
    console.log('hello')
  }

  static hi() {
    console.log('hi')
  }
}

let a = new Person1
console.log(a)
// a.hi()
Person1.hello()
Person1.hi()

// case 2
// console.log('case 2')
// class Person2 {
// }
// class A extends Person2 {
//   constructor() {
//     console.log(this) // error
//   }
// }
// new A()

// case 3
// class Base {
//   constructor() {
//     if (new.target === Base) {
//       throw new Error('不能实例化Base')
//     }
//     console.log('Base')
//   }
// }

// let base1 = new Base() // error

// case 4 class Mixins
console.log('case 4 class Mixins')
class Base2 {}
let FooMixin = (SuperClass) => class extends SuperClass {
  foo() {
    console.log('foo')
  }
}
let BarMixin = (SuperClass) => class extends SuperClass {
  bar() {
    console.log('bar')
  }
}
class B extends FooMixin(BarMixin(Base2)) {}
let b = new B()
b.foo()
b.bar()

// case 5 class Mixins 2
console.log('case 5 class Mixins 2')
class Base3 {}
let FooMixin3 = (SuperClass) => class extends SuperClass {
  foo() {
    console.log('foo 3')
  }
}
let BarMixin3 = (SuperClass) => class extends SuperClass {
  bar() {
    console.log('bar 3')
  }
}
function mix(BaseClass, ...Mixins) {
  return Mixins.reduce((acc, current) => current(acc), BaseClass)
}
class B3 extends mix(Base3, FooMixin3, BarMixin3) {}
let b3 = new B3()
b3.foo()
b3.bar()