// case 1
async function func1() {
  console.log('1')
  return '3'
}
func1().then(console.log)
console.log('2')

// case 2
async function foo() {
  console.log(await Promise.resolve('foo'))
}

async function bar() {
  console.log(await 'bar')
}

async function baz() {
  console.log('baz')
}

foo()
bar()
baz()