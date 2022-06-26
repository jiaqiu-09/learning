// case 1
for(var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log('case 1: ',i)
  }, 1000)
}

// case 2
for(var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log('case 2: ',i)
  }, 1000)
}

// case 3
for(let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log('case 3: ',i)
  }, 1000)
}

// case 4
for(let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log('case 4: ',i)
  }, 1000)
}

// case 5 
for(var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log('case 5: ',i)
    }, 1000)
  })(i)
}

// case 6
let a;
for(a = 0; a < 5; a++) {
  setTimeout(() => {
    console.log('case 6: ',a)
  }, 1000)
}

// case 7
(async() => {
  for(let i = 0; i < 5; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('case 7: ',i)
        resolve()
      }, 1000)
    })
  }
})()