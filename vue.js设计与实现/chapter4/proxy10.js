// 实现 watch immediate flush onInvalidate
const bucket = new WeakMap()

// const data = {text: 'hello world', ok: true}
const data = {foo: 1, bar: 2}

let activeEffect
let effectStack = []
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.deps = []
  effectFn.options = options
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
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
  effects.forEach(fn => {
    if (fn !== activeEffect) {
      effectsToRun.add(fn)
    }
  })
  effectsToRun.forEach(fn => {
    if (fn.options.scheduler) {
      fn.options.scheduler(fn)
    } else {
      fn()
    }
  })
}

function computed(getter) {
  let dirty = true
  let value
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true
        trigger(obj, 'value')
      }
    }
  })

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj, 'value')
      return value
    }
  }

  return obj
}

const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true

  p.then(() => {
    jobQueue.forEach(fn => fn())
  }).finally(() => {
    isFlushing = false
  })
}


function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  let newV, oldV
  let cleanup

  const job = () => {
    if (cleanup) {
      cleanup()
    }
    newV = effectFn()
    cb(newV, oldV, onInvalidate)
    oldV = newV
  }
  
  function onInvalidate(fn) {
    cleanup = fn
  }
  
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if (options.flush === 'post') {
        const p = Promise.resolve()
        p.then(job)
      } else {
        job()
      }
    }
  })
  if (options.immediate) {
    job()
  } else {
    oldV = effectFn()
  }
}

function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null, seen.has(value)) return

  seen.add(value)

  for(const k in value) {
    traverse(value[k], seen)
  }

  return value
}

watch(() => obj.foo + obj.bar, (n,o) => { console.log('foo changed', n, o) }, {immediate: true})
obj.bar = 5


let count = 0
function fetch() {
  count++
  const res = count === 1 ? 'A' : 'B'
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res)
    }, count === 1 ? 1000 : 100);
  })
}

let finallyData

watch(() => obj.foo, async(newV, oldV, onInvalidate) => {
  let valid = true
  onInvalidate(() => {
    valid = false
  })
  const res = await fetch()

  if (!valid) return

  finallyData = res
  console.log(finallyData)
})

obj.foo++

setTimeout(() => {
  obj.foo++
}, 200)