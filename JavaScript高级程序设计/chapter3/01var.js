// case1 报错
// function test() {
//   var message = 'hi'
// }

// test()
// console.log('message', message)

// case2 全局变量 不会报错
// function test() {
//   message = 'hi'
// }

// test()
// console.log('message', message)

// case3 暂时性死区
// console.log(age)
// let age = 18

// case4 var 声明的变量会变成window的属性 
// 在浏览器中执行有效
var a = 1
console.log(window.a)

