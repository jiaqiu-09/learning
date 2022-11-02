// case 1 暴力递归
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// console.log(new Date())
// const res = fibonacci(50)
// console.log('res: ', res)
// console.log(new Date())

// case 2 
function fibonacci2(n) {
  if (n < 1) {
    return 0
  }
  const meno = new Array(n + 1).fill(0)
  return fib2Helper(meno, n)
}

function fib2Helper(meno, n) {
  if (n === 1 || n === 2) {
    return 1
  }
  if (meno[n]) {
    return meno[n]
  }
  meno[n] = fib2Helper(meno, n - 1) + fib2Helper(meno, n - 2)
  return meno[n]
}

// console.log(new Date())
// const res2 = fibonacci2(100)
// console.log('res2: ', res2)
// console.log(new Date())

// case 3 
function fibonacci3(n) {
  if (n < 1) {
    return 0
  }
  const dp = new Array(n + 1).fill(0)
  dp[1] = dp[2] = 1
  for(let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
console.log(new Date())
const res3 = fibonacci3(1000)
console.log('res3: ', res3)
console.log(new Date())