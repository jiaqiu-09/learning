// promise notify
class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = []
    super((resolve, reject) => {
      return executor(resolve, reject, (status) => {
        console.log('status: ', status)
        notifyHandlers.map((handler) => handler(status))
      })
    })
    console.log('=== ', notifyHandlers)
    this.notifyHandlers = notifyHandlers
  }

  notify(notifyHandler) {
    console.log('notifyHandler: ', notifyHandler)
    console.log('this.notifyHandler: ', this.notifyHandlers)
    this.notifyHandlers.push(notifyHandler)
    return this
  }
}

let p = new TrackablePromise((resolve, reject, notify) => {
  function countDown(x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`)
      setTimeout(() => countDown(x - 1), 1000)
    } else {
      resolve()
    }
  }

  countDown(5)
})

p.notify((x) => setTimeout(console.log, 0, 'progress:', x)); 
p.then(() => setTimeout(console.log, 0, 'completed')); 