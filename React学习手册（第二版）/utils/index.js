const compose = (...fns) => arg => 
  fns.reduce((pre, f) => f(pre), arg)

module.exports = {
  compose
}