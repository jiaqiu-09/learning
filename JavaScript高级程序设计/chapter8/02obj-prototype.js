// case 1 setPrototypeOf
let bird = {
  numLegs: 2
}
let person = {
  name: 'x'
}
Object.setPrototypeOf(person, bird)
console.log(person)
console.log(Object.getPrototypeOf(person) === bird) // true
console.log(person.numLegs) // 2

// case 2 create
let bird2 = {
  numLegs: 2
}
let person2 = Object.create(bird2)
person2.name = 'xsx'
console.log(person2)
console.log(person2.numLegs)
console.log(Object.getPrototypeOf(person2) === bird2) // true

// case 3
let obj3 = {
  name: 'foo',
  age: 12,
}
Object.defineProperty(obj3, 'name', {
  enumerable: false,
})
console.log(Object.keys(obj3)) // ['age']
for(let key in obj3) {
  console.log(key)
}

// case 4 其他原型写法
function Person() {}
Person.prototype = {
  name: 'dd',
  age: 12,
  sayName() {
    console.log(this.name)
  }
}

let f = new Person()
console.log(f instanceof Object) // true
console.log(f instanceof Person) // true
console.log(f.constructor === Person) // false
console.log(f.constructor === Object) // true

// case 5 
console.log('case 5')
function Person5() {}
Person5.prototype = {
  constructor: Person5,
  name: 'dd',
  age: 12,
  sayName() {
    console.log(this.name)
  }
}

let f5 = new Person5()
console.log(f5 instanceof Object) // true
console.log(f5 instanceof Person5) // true
console.log(f5.constructor === Person5) // true
console.log(f5.constructor === Object) // false

// case 6
console.log('case 6')
function Person6() {}
let p6 = new Person6()
Person6.prototype = {
  sayName() {
    console.log('sayName')
  }
}
try {
  p6.sayName() // error TypeError: p6.sayName is not a function
} catch(e) {
  console.log(e)
}

// case 7
console.log('case 7')
function SuperType() {}
SuperType.prototype.getSuperValue = function () {
  return true
}

function SubType() {}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function () {
  return 'sub'
}
SubType.prototype.getSuperValue = function() {
  return 'sub rewrite'
}
let a = new SubType()
console.log(a.getSuperValue())
console.log(a.getSubValue())