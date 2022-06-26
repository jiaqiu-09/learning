// case 1 singleton
let singleton = function() {
  let privateName = 'origin'
  function privateFunc() {
    return 'haha: '
  }

  return {
    getName() {
      return privateName
    },
    getFunc() {
      return privateFunc()
    }
  }
}()

console.log(singleton)
console.log(singleton.getName()) // origin
console.log(singleton.getFunc()) // haha:

// case 2 singleton2
let singleton2 = function() {
  let privateName = 'origin'
  function privateFunc() {
    return 'haha: '
  }

  let obj = new Object()

  obj.getName = function() {
    return privateName
  }
  obj.name = 'hello'
  obj.getFunc = function() {
    return privateFunc()
  }
  return obj
}()


console.log(singleton2)
console.log(singleton2.getName()) // origin
console.log(singleton2.getFunc()) // haha: