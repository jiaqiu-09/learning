// case 1
async function foo() {
  console.log(2)
  console.log(await Promise.resolve(8))
  console.log(9)
}

async function bar() {
  console.log(4)
  console.log(await 6)
  console.log(7)
}

console.log(1)
foo()
console.log(3)
bar()
console.log(5)

// node version == 10.24.1 -> 1 2 3 4 5 6 7 8 9
// else -> 1 2 3 4 5 8 9 6 7