// case 1 
let text = 'hello world'
console.log(text.indexOf('o')) // 4
console.log(text.lastIndexOf('o')) // 7

// case 2
let text1 = 'hello'
console.log(text1.indexOf('o')) // 4
console.log(text1.lastIndexOf('o')) // 4

// case 3
let text2 = 'hello world'
console.log(text2.slice(-3)) // 'rld'
console.log(text2.substring(-3)) // 'hello world'
console.log(text2.substr(-3)) // 'rld'

console.log(text2.slice(0, -3)) // 'hello wo'
console.log(text2.substring(0, -3)) // ''
console.log(text2.substr(0, -3)) // ''

console.log(text2.substring(3, -1)) // 'hel'
console.log(text2.substring(0, 3)) // 'hel'
console.log(text2.substring(-2, 3)) // 'hel'