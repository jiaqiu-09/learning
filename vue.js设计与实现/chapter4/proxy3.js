const bucket = new WeakMap()

const data = {text: 'hello world'}
let activeEffect

function effect(fn) {
  activeEffect = fn
  fn()
}

const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
    trigger(target, key)
  }
})


function track(target, key) {
  if (!activeEffect) {
    return
  }
  let depMap = bucket.get(target)
  if (!depMap) {
    bucket.set(target, depMap = new Map())
  }

  let deps = depMap.get(key)
  if (!deps) {
    depMap.set(key, deps = new Set())
  }
  deps.add(activeEffect)
}

function trigger(target, key) {
  let depMap = bucket.get(target)
  if (!depMap) return
  const effects = depMap.get(key)
  effect && effects.forEach(fn => fn())
}

effect(() => {
  document.body.innerText = obj.text
})

setTimeout(() => {
  obj.text = 'hello vue3'
}, 3000)


// ???
// const map = new Map();
// const weakMap = new WeakMap();

// (function() {
//   const foo = {foo: 1}
//   const bar = {bar: 2}

//   map.set(foo, 1)
//   weakMap.set(bar, 2)
// })();

// console.log(Object.keys(map))
// console.log(Object.keys(weakMap))
