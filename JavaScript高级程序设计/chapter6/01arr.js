// case 1 copyWithin
let ints = [0,1,2,3,4,5,6,7,8,9]
ints.copyWithin(-4, -7, -3)
console.log('ints', ints)

// case 2 forEach 基本数据类型
let arr1 = [1,2,3,4]
arr1.forEach(i => i * 2)
console.log(arr1)

// case 3 forEach 引用数据类型
let arr2 = [{name: 'a'}, {name: 'b'}]
arr2.forEach((i, index) => i.age = index)
console.log(arr2)

// case 4
const buff = new ArrayBuffer(12)
const ints2 = new Int32Array(buff)
console.log(ints2.length) // 3

// case 5
const int3 = new Int32Array(6)
console.log(int3.length) // 6
console.log(int3.byteLength) // 4 * 6 = 24

// case 6
const int4 = new Int32Array([2,4,6,8])
console.log(int4.length) // 4
console.log(int4.byteLength) // 4 * 4 = 16
console.log(int4[2]) // 6

// case 7
const int5 = new Int32Array(1),
floats = new Float64Array(1),
int6 = new Int16Array(2)
console.log(int5.BYTES_PER_ELEMENT) // 4
console.log(floats.BYTES_PER_ELEMENT) // 8
console.log(int6.BYTES_PER_ELEMENT) // 2

// case 8
const int7 = new Int32Array([2,4,6,7])
for(const int of int7) {
  console.log(int)
}

// case 9 定型数组 set
const container = new Int16Array(8)
container.set(Int8Array.of(1,2,3,4))
console.log(container) // [1,2,3,4,0,0,0,0]

// set 普通数组
container.set([5,6,7,8], 4)
console.log(container) // [1,2,3,4,5,6,7,8]

// 溢出
// container.set([2,3], 7)
// console.log(container)

// case 10 subarray
const source = Int16Array.of(2,4,6,8)
const fullCopy = source.subarray()
console.log(fullCopy)

// case 11 subarray halfcopy
const halfcopy = source.subarray(2)
console.log(halfcopy)

// case 12 
const partialCopy = source.subarray(1,3)
console.log(partialCopy)