// case 1 函数作用域
let color = 'blue'
function changeColor() {
  if (color === 'blue') {
    color = 'red'
  } else {
    color = 'blue'
  }
}
changeColor()
console.log('color: ', color) // 'red'