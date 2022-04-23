// reactive array index and length
const bucket = new WeakMap()

// const data = {text: 'hello world', ok: true}
const data = {
  foo: 1,
  baz: {foo: 1},
  get bar() {
    return this.foo
  },
}
const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
}

const ITERATE = Symbol()

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

function createReactive(data, isShallow = false, isReadonly = false) {
  return new Proxy(data, {
    get(target, key, receiver) {
      if (key === 'raw') {
        return target
      }
      if (!isReadonly) {
        track(target, key)
      }

      const res = Reflect.get(target, key, receiver)
      if (isShallow) {
        return res
      }

      if (typeof res === 'object' && res !== null) {
        return isReadonly ? readOnly(res) : reactiveProxy(res)
      }
      return res
    },
    set(target, key, newValue, receiver) {
      if (isReadonly) {
        console.warn(`${key} is readOnly, can not set value`)
        return true
      }
      const oldValue = target[key]
      const type = Array.isArray(target) ?
        Number(key) < target.length ? TriggerType.SET : TriggerType.ADD :
        Object.prototype.hasOwnProperty.call(target, key) ? TriggerType.SET : TriggerType.ADD
      const res = Reflect.set(target, key, newValue, receiver)
      // console.log(receiver.raw === target)      
      if (target === receiver.raw) {
        if (oldValue !== newValue && (oldValue === oldValue || newValue === newValue)) {
          trigger(target, key, type, newValue)
        }
      }
      return res
    },
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    ownKeys(target) {
      track(target, ITERATE)
      return Reflect.ownKeys(target)
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`${key} is readOnly, can not delete.`)
        return true
      }
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const res = Reflect.deleteProperty(target, key)
      if (res && hadKey) {
        trigger(target, key, TriggerType.DELETE)
      }
      return res
    }
  })
}

function reactiveProxy(obj) {
  return createReactive(obj)
}

function shallowReactiveProxy(obj) {
  return createReactive(obj, true)
}

function readOnly(obj) {
  return createReactive(obj, false, true)
}

function readOnlyShallow(obj) {
  return createReactive(obj, true, true)
}

const obj = createReactive(data)

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

function trigger(target, key, type, newValue) {
  let depMap = bucket.get(target)
  if (!depMap) return
  const effects = depMap.get(key)

  const effectsToRun = new Set(effects)
  effects && effects.forEach(fn => {
    if (fn !== activeEffect) {
      effectsToRun.add(fn)
    }
  })
  if (Array.isArray(target) && key === 'length') {
    depMap.forEach((_effects, key) => {
      if (key >= newValue) {
        effects.forEach(fn => {
          effectsToRun.add(fn)
        })
      }
    })
  }
  console.log(type, key)

  if (type === TriggerType.ADD || type === TriggerType.DELETE) {  
    const iterateEffects = depMap.get(ITERATE)
    iterateEffects && iterateEffects.forEach(fn => {
      if (fn !== activeEffect) {
        effectsToRun.add(fn)
      }
    })
  }
  if (type === TriggerType.ADD && Array.isArray(target)) {
    const lengthEffects = depMap.get('length')
    lengthEffects && lengthEffects.forEach(fn => {
      if (fn !== activeEffect) {
        effectsToRun.add(fn)
      }
    })
  }

  effectsToRun && effectsToRun.forEach(fn => {
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

const a = ['foo']
const arr = reactiveProxy(a)

effect(() => {
  console.log(arr.length)
  console.log(arr[0])
})

arr[1] = 'bar'
arr.length = 0


