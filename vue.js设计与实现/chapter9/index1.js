// 处理 class unmount
const { effect, ref } = VueReactivity

// function renderer(domString, container) {
//   container.innerHTML = domString
// }

// const count = ref(1)
// effect(() => {
//   renderer(`<h1>count: ${count.value}</h1>`, document.getElementById('app'))
// })
// count.value++
const Text = Symbol() // 代表文本节点type
const Comment = Symbol() // 代表注释节点type
const Fragment = Symbol() // 代表Fragment节点type

function shouldSetAsProps(el, key, value) {
  // 特殊处理 form
  if (el.tagName === 'INPUT' && key === 'form') return false
  return key in el
}

function createRenderer(options) {
  const {
    createElement,
    setElementText,
    insert,
    patchProps,
    setText,
    createText,
    createComment
  } = options

  function patch(n1, n2, container, anchor = null) {
    if (n1 && n1.type !== n2.type) {
      unmount(n1)
      n1 = null
    }
    const { type } = n2
    if (type === Text) {
      // 文件节点
      if (!n1) {
        const el = n2.el = createText(n2.children)
        insert(el, container)
      } else {
        const el = n2.el = n1.el
        if (n2.children != n1.children) {
          setText(el, n2.children)
        }
      }
    } else if (type === Comment) {
      // 注释节点
      if (!n1) {
        const el = n2.el = createComment(n2.children)
        insert(el, container)
      } else {
        const el = n2.el = n1.el
        if (n2.children != n1.children) {
          setText(el, n2.children)
        }
      }
    } else if (type === Fragment) {
      // Fragment节点
      if (!n1) {
        n2.children.forEach(c => patch(null, c, container))
      } else {
        patchChildren(n1, n2, container)
      }
    } else if (typeof type === 'string') {
      // n1 不存在意味着 挂载
      if(!n1) {
        mountElement(n2, container, anchor)
      } else {
        patchElement(n1, n2)
      }
    } else if (typeof type === 'object') {
      // n2 是组件 
    } else if (typeof type === 'xxx') {
      // n2 是其他类型
    }
    
  }
  function patchElement(n1, n2) {
    const el = n2.el = n1.el
    const oldProps = n1.props
    const newProps = n2.props
    
    // step 1
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key])
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null)
      }
    }

    // step 2
    patchChildren(n1, n2, el)
  }
  /**
   * 
   * @param {*} n1 oldNode
   * @param {*} n2 newNode
   * @param {*} container 
   */
  function patchChildren(n1, n2, container) {
    if (typeof n2.children === 'string') {
      if (Array.isArray(n1.children)) {
        n1.children.forEach(e => unmount(e))
      }
      setElementText(container, n2.children)
    } else if (Array.isArray(n2.children)) {
      // 适用于 (Array.isArray(n2.children) && Array.isArray(n1.children)) === true
      const oldChildren = n1.children
      const newChildren = n2.children
      let lastIndex = 0
      for(let i = 0; i < newChildren.length; i ++) {
        const _newNode = newChildren[i]
        let find = false
        for(let j = 0; j < oldChildren.length; j ++) {
          const _oldNode = oldChildren[j]
          if (_newNode.key === _oldNode.key)  {
            find = true
            patch(_oldNode, _newNode, container)
            if (j < lastIndex) {
              const preNode = newChildren[i - 1]
              if (preNode) {
                const anchor = preNode.el.nextSibling
                insert(_newNode.el, container, anchor)
              }
            } else {
              lastIndex = j
            }
            break;
          }
        }
        if (!find) {
          const preNode = newChildren[i - 1]
          let anchor = null
          if (preNode) {
            anchor = preNode.el.nextSibling
          } else {
            anchor = container.firstChild
          }
          patch(null, _newNode, container, anchor)
        }
      }
      // 暴力但通用
      // if (Array.isArray(n1.children)) {
      //   n1.children.forEach(c => unmount(c))
      //   n2.children.forEach(c => patch(null, c, container))
      // } else {
      //   setElementText(container, '')
      //   n2.children.forEach(c => patch(null, c, container))
      // }
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach(c => unmount(c))
      } else if (typeof n1.children === 'string') {
        setElementText(container, '')
      }
    }
  }
  function mountElement(vnode, container, anchor = null) {
    const el = vnode.el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        patch(null, child, el)
      })
    }
    if (vnode.props) {
      // 方式 1
      // for(const key in vnode.props) {
      //   el[key] = vnode.props[key]
      // }
      // 方式 2
      // for(const key in vnode.props) {
      //   el.setAttribute(key, vnode.props[key])
      // }
      // 方式 3
      for(const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }
    
    insert(el, container, anchor)
  }
  function unmount(vnode) {
    if (vnode.type === Fragment) {
      vnode.children.forEach(c => unmount(c))
      return
    }
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }
  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }
  return {
    render
  }
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  createText(text) {
    return document.createTextNode(text)
  },
  createComment(text) {
    return document.createComment(text)
  },
  setText(el, text) {
    el.nodeValue = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  patchProps(el, key, preValue, nextValue) {
    if (/^on/.test(key)) {
      const name = key.slice(2).toLowerCase()
      const invokers = el._evi || (el._evi = {})
      let invoker = invokers[key]
      if (nextValue) {
        if (!invoker) {
          invoker = el._evi[key] = (e) => {
            if (e.timeStamp < invoker.attached) return
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach(fn => fn(e))
            }else {
              invoker.value(e)
            }
          }
          invoker.value = nextValue
          invoker.attached = performance.now()
          el.addEventListener(name, invoker)
        } else {
          invoker.value = nextValue
        }
      } else if (invoker) {
        el.removeEventListener(name, invoker)
      }
    } else if (key === 'class') {
      el.className = nextValue || ''
    } else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key]
      const value = nextValue
      if (type === 'boolean' && value === '') {
        el[key] = true
      } else {
        el[key] = value
      }
    } else {
      el.setAttribute(key, nextValue)
    }
  }
})

const vnode1 = {
  type: Fragment,
  children: [
    {
      type: 'p',
      key: '1',
      children: 'child1'
    },
    {
      type: 'p',
      key: '2',
      children: 'child2'
    },
    {
      type: 'p',
      key: '3',
      children: 'child3'
    }
  ]
}
const vnode2 = {
  type: Fragment,
  children: [
    {
      type: 'p',
      key: '5',
      children: 'child5'
    },
    {
      type: 'p',
      key: '3',
      children: 'new child3'
    },
    {
      type: 'p',
      key: '4',
      children: 'child4'
    },
    {
      type: 'p',
      key: '1',
      children: 'new child1'
    },
    {
      type: 'p',
      key: '2',
      children: 'new child2'
    }
  ]
}
renderer.render(vnode1, document.getElementById('app'))
setTimeout(() => {
  renderer.render(vnode2, document.getElementById('app'))
}, 3000)