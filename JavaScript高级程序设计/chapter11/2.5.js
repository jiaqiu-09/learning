// case 1
let promise = new Promise((resolve) => {
  console.log('11')
  resolve()
  console.log('22')
})

promise.then(() => console.log('44'))
console.log('33')

// case 2
let func2
let promise2 = new Promise((resolve) => {
  func2 = function() {
    console.log('case2 11')
    resolve()
    console.log('case2 22')
  }
})
func2()
promise2.then(() => console.log('case2 44'))
console.log('case2 33')

// case 3

