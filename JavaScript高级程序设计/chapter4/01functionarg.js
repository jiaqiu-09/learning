// case 1 函数参数 只有值传递
function add(num) {
  num += 10
  return num
}
let num = 20
add(num)
console.log(num) // 20

// case 2
function test2(obj) {
  obj.name = 'xxas'
}
let obj = new Object()
test2(obj)
console.log(obj.name) // 'xxas'

// case 3 
function test3(obj) {
  obj.name = 'xxas'
  obj = new Object()
  obj.name = 'hello'
}
let obj1 = new Object()
test3(obj1)
console.log(obj1.name) // 'xxas'

// case 4
console.log('asa' instanceof String) // false