// case 1
let p1 = new Promise((resolve, reject) => {
  console.log('start')
  reject(Error("bar"))
}).catch(e => {
  console.log('error: ', e)
}).then(() => {
  console.log('end')
})