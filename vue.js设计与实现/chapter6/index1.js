// ref
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
const MAPITERATE = Symbol()
const reactiveMap = new Map()

let activeEffect
let shouldTrack = true 
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

const arrayInstrumentations = {};
const mutableInstrumentations = {
  add(key) {
    const target = this.raw
    if (!target.has(key)) {
      const res = target.add(key)
      trigger(target, key, TriggerType.ADD) 
      return res
    }
  },
  delete(key) {
    const target = this.raw
    if (target.has(key)) {
      const res = target.delete(key)
      trigger(target, key, TriggerType.DELETE)
      return res
    }
  },
  get(key) {
    const target = this.raw
    const hadKey = target.has(key)
    track(target, key)
    if (hadKey) {
      const res = target.get(key)
      return typeof res === 'object' ? reactiveProxy(res) : res
    }
  },
  set(key, value) {
    console.log('set', key, value)
    const target = this.raw
    const hadKey = target.has(key)
    const oldValue = target.get(key)
    const rawValue = value.raw || value
    target.set(key, rawValue)
    if (!hadKey) {
      trigger(target, key, TriggerType.ADD)
    } else if (oldValue !== value || (oldValue === oldValue && value === value )) {
      trigger(target, key, TriggerType.SET)
    }
  },
  forEach(callback, thisArg) {
    const target = this.raw
    const wrap = (val) => typeof val === 'object' ? reactiveProxy(val) : val
    track(target, ITERATE)
    target.forEach((v, k) => {
      callback.call(thisArg, wrap(v), wrap(k), this)
      // callback.call(null, wrap(v), wrap(k), this)
    })
  },
  [Symbol.iterator]: iteratorMethod,
  entries: iteratorMethod,
  values: valuesMethod,
  keys: keysMethod
};

function valuesMethod() {
  const target = this.raw
  const itr = target.values()
  const wrap = (val) => (typeof val === 'object' && val !== null) ? reactiveProxy(val) : val
  track(target, ITERATE)

  return {
    next() {
      const { value, done } = itr.next()
      return {
        value: value ? wrap(value) : value,
        done
      }
    },
    [Symbol.iterator]() {
      return this 
    }
  }
}

function keysMethod() {
  const target = this.raw
  const itr = target.keys()
  const wrap = (val) => (typeof val === 'object' && val !== null) ? reactiveProxy(val) : val
  track(target, MAPITERATE)

  return {
    next() {
      const { value, done } = itr.next()
      return {
        value: value ? wrap(value) : value,
        done
      }
    },
    [Symbol.iterator]() {
      return this 
    }
  }
}

function iteratorMethod() {
  const target = this.raw
  const itr = target[Symbol.iterator]()
  const wrap = (val) => (typeof val === 'object' && val !== null) ? reactiveProxy(val) : val
  track(target, ITERATE)
  return {
    next() {
      const {value, done} = itr.next()
      return {
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done
      }
    },
    [Symbol.iterator]() {
      return this
    }
  }
}

;['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args) {
    let res = originMethod.apply(this, args)
    if (res === false) {
      res = originMethod.apply(this.raw, args)
    }
    return res
  }
})

;['push', 'pop', 'shift', 'unshift', 'splice'].forEach(method => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function(...args) {
    shouldTrack = false
    let res = originMethod.apply(this, args)
    shouldTrack = true
    return res
  }
})

function createReactive(data, isShallow = false, isReadonly = false) {
  return new Proxy(data, {
    get(target, key, receiver) {
      if (key === 'raw') {
        return target
      }
      const targetType = Object.prototype.toString.call(target)
      // handle set
      if (targetType === '[object Set]' || targetType === '[object Map]') {
        if (key === 'size') {
          track(target, ITERATE)
          return Reflect.get(target, key, target)
        }
        return mutableInstrumentations[key]
      }
      
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        console.log(key)
        return Reflect.get(arrayInstrumentations, key, receiver)
      }

      if (!isReadonly && typeof key !== 'symbol') {
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
      track(target, Array.isArray(target) ? 'length': ITERATE)
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

function ref(val) {
  const wrapper = {
    value: val
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  return reactiveProxy(wrapper)
}

function toRef(obj, key) {
  const wrapper = {
    get value() {
      return obj[key]
    }
  }
  return wrapper
}

function reactiveProxy(obj) {
  const existedProxy = reactiveMap.get(obj)
  if (existedProxy) {
    return existedProxy
  }
  const proxy = createReactive(obj)
  reactiveMap.set(obj, proxy)
  return proxy
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
  if (!activeEffect || !shouldTrack) {
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

  if ((type === TriggerType.ADD || type === TriggerType.DELETE) && Object.prototype.toString.call(target) === '[object Map]') {  
    const iterateEffects = depMap.get(MAPITERATE)
    iterateEffects && iterateEffects.forEach(fn => {
      if (fn !== activeEffect) {
        effectsToRun.add(fn)
      }
    })
  }

  if (type === TriggerType.ADD || type === TriggerType.DELETE || (type === TriggerType.SET && Object.prototype.toString.call(target) === '[object Map]')) {  
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

// case 1
// const p1 = reactiveProxy(1)
// effect(() => {
//   console.log(p1)
// })
// const p1 = ref(1)
// effect(() => {
//   console.log(p1)
//   console.log(p1.value)
// })
// p1.value = 2

// case 2
// const obj1 = reactiveProxy({foo:1, bar: 2})
// // const newObj = {
// //   ...obj1
// // }
// const newObj = {
//   foo: toRef(obj1, 'foo'),
//   bar: toRef(obj1, 'bar')
// }
// effect(() => {
//   console.log(newObj.foo)
// })
// obj1.foo++
const p1 = reactiveProxy({count: 1})
function renderer(domString, container) {
  container.innerHTML = domString
}

effect(() => {
  renderer(`<h1>count: ${p1.count}</h1>`, document.body)
})
setTimeout(() => {
  p1.count ++
}, 1000)