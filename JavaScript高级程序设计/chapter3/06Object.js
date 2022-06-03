// case 1 hasOwnProperty
let a = { name: 'xx' }
let b = Symbol('B')
a[b] = 'xx'
console.log(a.hasOwnProperty('name'))
console.log(a.hasOwnProperty(b))

// case 2 toLocaleString
let a2 = { name:'xx', time: new Date() }
console.log(a2.time.toString())
console.log(a2.time.toLocaleString())

// case 3 swap 
let a3 = '22'
let a4 = '21'

a3 = a3 ^ a4
a4 = a3 ^ a4
a3 = a3 ^ a4
console.log('a3:', a3)
console.log('a4:', a4)
console.log(-64 >>> 5)
console.log(Number(-64).toString(2))
console.log(Number(64).toString(2))