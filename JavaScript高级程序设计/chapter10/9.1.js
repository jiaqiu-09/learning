// case 1
function factorial(num) {
  if (num <=1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}

console.log(factorial(3)) // 6

let trueF = factorial

factorial = function() {
  return 0
}

console.log(trueF(3)) // 0
console.log(factorial(3)) // 0

// case 2
function factorial2(num) {
  if (num <=1) {
    return 1
  } else {
    return num * arguments.callee(num - 1)
  }
}

console.log(factorial(3)) // 6

let trueF2 = factorial2

factorial2 = function() {
  return 0
}

console.log(trueF2(3)) // 6
console.log(factorial2(3)) // 0