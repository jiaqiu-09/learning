// case 1
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person1 = {
  name: 'foo',
  arr: ['1', '2', '3']
}

let subPerson1 = object(person1)
subPerson1.arr.push('4')
subPerson1.name = '2'
console.log(subPerson1)
console.log(person1)

let subPerson2 = object(person1)
subPerson2.arr.push('5')
console.log(subPerson2)
console.log(person1)

// case 2
let person2 = {
  name: 'foo',
  arr: ['1', '2', '3']
}

let subPerson3 = Object.create(person2)
subPerson3.arr.push('4')
subPerson3.name = '2'
console.log(subPerson3)
console.log(person2)

let subPerson4 = Object.create(person2)
subPerson4.arr.push('5')
console.log(subPerson4)
console.log(person2)