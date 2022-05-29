// case 1 toString 参数
let num = 'das'
console.log(num.toString(2))

// 数字转进制字符串
let num1 = 10
console.log(num1.toString(2))
console.log(num1.toString(8))
console.log(num1.toString(10))
console.log(num1.toString(16))

// case 2 模板字符串 标签函数
let a = 6 
let b = 7
function sumString(string, ...rest) {
  console.log('string', string)
  return string[0] + rest.map((item, idx) => `${item}${string[idx + 1]}`).join('')
}
let res = sumString`sum: ${a} + ${b} = ${a + b}`
console.log(res)
