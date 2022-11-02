// case 1
let p1 = new Promise((resolve, reject) => {
  console.log('1')
  setTimeout(resolve, 1000)
})

p1.then(() => new Promise((resolve, reject) => {
  console.log('2')
  setTimeout(resolve, 1000)
})).then(() => new Promise((resolve, reject) => {
  console.log('3')
  setTimeout(resolve, 1000)
})).then(() => new Promise((resolve, reject) => {
  console.log('4')
  setTimeout(resolve, 1000)
}))

// case 2
let p2 = Promise.race([Promise.reject(3), new Promise((resolve, reject) => {
  setTimeout(reject, 1000)
})])
p2.catch(e => {
  console.log('case2 :', e)
})

// case 3
function addTwo(x) {return x + 2}
function addThree(x) {return x + 3}
function addFive(x) {return x + 5}

function addTen(x) {
  return [addTwo, addThree, addFive].reduce((promise, fn) => promise.then(fn),
    Promise.resolve(x))
}

console.log('-=-=')
addTen(8).then(console.log)

function compose(...fns) {
  return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}

let newAddTen = compose(addFive, addThree, addTwo)
newAddTen(10).then(console.log)