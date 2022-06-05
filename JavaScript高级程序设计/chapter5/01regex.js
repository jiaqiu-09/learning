// case 1
console.log('----case1----')
let text = 'cat, bat, sat, fat'
let pattern = /.at/
let matches = pattern.exec(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(pattern.lastIndex) // 0

matches = pattern.exec(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(pattern.lastIndex) // 0
console.log('----case1----')

// case 2
console.log('----case2----')
let text2 = 'cat, bat, sat, fat'
let pattern2 = /.at/g
let matches2 = pattern2.exec(text2)
console.log(matches2.index) // 0
console.log(matches2[0]) // cat
console.log(pattern2.lastIndex) // 3

matches2 = pattern2.exec(text2)
console.log(matches2.index) // 5
console.log(matches2[0]) // bat
console.log(pattern2.lastIndex) // 8

matches2 = pattern2.exec(text2)
console.log(matches2.index) // 10
console.log(matches2[0]) // sat
console.log(pattern2.lastIndex) // 13
console.log('----case2----')

// case 3
console.log('----case3----')
let text3 = 'cat, bat, sat, fat'
let pattern3 = /.at/y
let matches3 = pattern3.exec(text3)
console.log(matches3.index) // 0
console.log(matches3[0]) // cat
console.log(pattern3.lastIndex) // 3

matches3 = pattern3.exec(text3)
console.log(matches3) // null
console.log(pattern3.lastIndex) // 0

pattern3.lastIndex = 5
matches3 = pattern3.exec(text3)
console.log(matches3.index) // 5
console.log(matches3[0]) // bat
console.log(pattern3.lastIndex) // 8
console.log('----case3----')

// case 4
console.log('----case4----')
let text4 = "this has been a short summer";
let pattern4 = /(.)hort/g;
if (pattern4.test(text4)) {
  console.log(RegExp.input);        // this has been a short summer
  console.log(RegExp.leftContext);  // 'this has been a '
  console.log(RegExp.rightContext); // ' summer'
  console.log(RegExp.lastMatch);    // short
  console.log(RegExp.lastParen);    // s

  console.log(RegExp.$_);        // this has been a short summer
  console.log(RegExp["$`"]);  // 'this has been a '
  console.log(RegExp["$'"]); // ' summer'
  console.log(RegExp["$&"]);    // short
  console.log(RegExp["$+"]);    // s
}

console.log('----case4----')

