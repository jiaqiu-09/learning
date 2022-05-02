function countDown(n) {
  while(n --> 0) {
    console.log('now is:' + n);
  }
}

countDown(10);

let numArr = [1, 2, 3];

numArr.forEach((item) => {
    item = item * 2;
});
console.log(numArr);