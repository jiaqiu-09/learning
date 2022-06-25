// case 1
function a () {
  console.log(arguments.length)
}

a(...[1,2,3,4])

let b = (c,d,e) => {
  console.log(arguments)
  console.log(c,d,e)
}
b(...[1,2,3])