// case 1 Object.assign
let dest = {
  set a(val) {
    console.log(`set a ${val}`)
  }
}

let src = {
  get a() {
    console.log('get a')
    return 'foo'
  }
}

Object.assign(dest, src)
console.log(dest)

// case 2
let dest2 = {id:'dest'}
let result2 = Object.assign(dest2, {id:'src', a: 'a'}, {id:'dest2', 'b': 'b'})
console.log(result2)
console.log(dest2)

// case 3
console.log(+0 === -0) // true
console.log(-0 === 0) // true
console.log(+0 === -0) // true
console.log(NaN === NaN) // false
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(+0, +0)) // true
console.log(Object.is(-0, -0)) // true

// case 4
let obj4 = {
  name: 'foo',
  age: 12,
  job: {
    title: 'bar'
  }
}
let copyObj4 = {};
({name: copyObj4.name, age: copyObj4.age, job: copyObj4.job} = obj4)
obj4.name = 'foo + 1'
obj4.job.title = 'bar + 1'
console.log(obj4)
console.log(copyObj4)

// case 5
function Person() {}
console.log(Person.prototype)
console.log(typeof Person.prototype)
console.log(Person.prototype.constructor === Person)