// import {hello} from './bar'

// var hungry = 'hippo';

// function awesome() {
//   console.log(hello(hungry).toUpperCase())
// }

// export {awesome};

// function foo() {
//   console.log( a ); // 2
// }

// function bar() {
//   var a = 3;
//   foo();
// }

// var a = 2;

// bar();

// let (a = 2) {
//   console.log( a ); // 2
// }

// console.log( a );

// var obj = {
//   id: "awesome",
//   cool: function coolFn() {
//       console.log( this.id );
//   }
// };

// var id = "not awesome"

// obj.cool(); // 酷

// setTimeout( function() {
//   console.log('obj.cool', obj.cool)
// }, 100 ); // 不酷

// this 指向
// function showName() {
//   return this.name.toUpperCase()
// }
// function speak() {
//   let greeting = "hello, I'm " + showName.call(this)
//   console.log(greeting)
// }
// let amy = {
//   name: 'Amy'
// }
// let john = {
//   name: 'John'
// }
// speak.call(amy)
// speak.call(john)


// let a = [1,2,3,4,5].map(function (n) {
//   return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
// });
// console.log(a)


// function foo(num) {
//   console.log( "foo: " + num );

//   // 记录foo被调用的次数
//   foo.count++;
// }

// foo.count = 0

// var i;

// for (i=0; i<10; i++) {
//   if (i > 5) {
//       foo( i );
//   }
// }
// // foo: 6
// // foo: 7
// // foo: 8
// // foo: 9

// // foo被调用了多少次？
// console.log( foo.count ); // 4