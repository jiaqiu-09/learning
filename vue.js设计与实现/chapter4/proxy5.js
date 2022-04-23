const bucket = new WeakMap()

// const data = {text: 'hello world', ok: true}
const data = {foo: true, bar: true}

let activeEffect
let effectStack = []
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()

    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
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

function cleanup(effectFn) {
  for(let i = 0; i < effectFn.deps.length; i ++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }

  effectFn.deps.length = 0
}

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
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  let depMap = bucket.get(target)
  if (!depMap) return
  const effects = depMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(fn => fn())
}

let temp1, temp2;
effect(() => {
  console.log('f1')
  effect(() => {
    console.log('f2')
    temp2 = obj.bar
  })
  temp1 = obj.foo
})

setTimeout(() => {
  obj.bar = false
}, 2000)