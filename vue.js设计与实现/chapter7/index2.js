const { effect, ref } = VueReactivity

// function renderer(domString, container) {
//   container.innerHTML = domString
// }

// const count = ref(1)
// effect(() => {
//   renderer(`<h1>count: ${count.value}</h1>`, document.getElementById('app'))
// })
// count.value++

function createRenderer(options) {
  const {
    createElement,
    setElementText,
    insert
  } = options
  function patch(n1, n2, container) {
    // n1 不存在意味着 挂载
    if(!n1) {
      mountElement(n2, container)
    } else {

    }
  }
  function mountElement(vnode, container) {
    const el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    }
    insert(el, container)
  }
  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        container.innerHTML = ''
      }
    }
    container._vnode = vnode
  }
  return {
    render
  }
}

const vnode = {
  type: 'h1',
  children: 'hello Vue3'
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  }
})
renderer.render(vnode, document.getElementById('app'))