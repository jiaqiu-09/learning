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