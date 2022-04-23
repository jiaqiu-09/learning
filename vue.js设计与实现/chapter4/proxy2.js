const bucket = new Set()

let activeEffect 
function effect(fn) {
  activeEffect = fn
  fn()
}
const data = {text: 'hello world'}

const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
    bucket.forEach(fn => fn())
    return true
  }
})

effect(() => {
  console.log("come in")
  document.body.innerText = obj.text
})

setTimeout(() => {
  obj.text = 'hello vue3'
}, 3000)

setTimeout(() => {
  obj.nonExist = 'hello vue3'
}, 3000)