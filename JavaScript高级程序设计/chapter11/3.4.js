// case 1
// function fooPromiseExecutor(resolve, reject) { 
//   setTimeout(reject, 1000, 'bar');  
// }

// function foo() {  
//   new Promise(fooPromiseExecutor); 
// }
// foo()

// case 2
function fooPromiseExecutor(resolve, reject) { 
  setTimeout(reject, 1000, 'bar');  
}

async function foo() {  
  await new Promise(fooPromiseExecutor); 
}
foo()