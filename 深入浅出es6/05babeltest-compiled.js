let a = 99;
let b = `${a} is 99`;

function countDown(n) {
  while (n-- > 0) {
    console.log('now is:' + n);
  }
}

countDown(10);

function* test() {
  yield 1;
  yield 2;
}
