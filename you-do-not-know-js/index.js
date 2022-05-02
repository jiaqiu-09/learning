// // import foo from './foo.js';
// // import bar from './bar.js';

// // console.log(
// //   bar.hello( "rhino" )
// // ); // Let me introduce: rhino

// // foo.awesome(); // LET ME INTRODUCE: HIPPO


// function a () {
//   console.log('aa')
//   b()
// }

// function b() {
//   console.log('bb')
//   c()
// }

// function c() {
//   console.log('cc')
//   d()
// }

// function d() {
//   debugger
//   console.log('dd')

// }

// a()

// function foo() { 
//   console.log( this.a );
// }

// var a = 2;

// (function(){ 
//   "use strict";

//   foo(); // 2 
// })();

// function foo() {
//   console.log('this.a: ', this.a)
// }
// var obj = {
//   a: 2,
//   obj2: {
//     a: 42,
//     foo: foo
//   }
// }
// obj.obj2.foo()

// function foo() {
//   console.log('this.a: ', this.a)
// }

// let obj = {
//   a: 2,
//   foo: foo
// }

// var bar = obj.foo
// var a = "dddd"
// bar()

// function foo(something) {
//   console.log(this.a, something)
//   return this.a + something
// }

// var obj = {
//   a: 2,
//   foo: foo
// }

// var bar = foo.bind(obj)
// var aa = bar(4)
// console.log(aa)


// function foo (a) {
//   console.log(a, this.name)
// }

// var obj = {
//   name: 'sss'
// }

// // [1,2,3].forEach(foo, obj)
// let arr = [1,2,3]
// arr.forEach(foo, obj)

// function foo(p1,p2) {
//   this.val = p1 + p2
// }

// var bar = foo.bind(null, 'pp1')

// var baz = new bar('pp2')
// console.log(baz.val)

// function foo(something) {
//   this.a = something
// }
// var obj1 = {}
// var bar = foo.bind(obj1)
// console.log(bar)
// bar(2)
// console.log(obj1.a)

// var baz = new bar(3)
// console.log(obj1.a)
// console.log(baz.a)

// function foo() {
//   return (a) => {
//     console.log(this.a)
//   }
// }
// var obj1 = {a:2}
// var obj2 = {a:3}
// var bar = foo.call(obj1)
// bar.call(obj2)
// console.log(bar)

// let a = {}

// Object.defineProperty(a, 'a',{
//   value: 2,
//   writable: true,
//   configurable: false
// })

// // a.a = 22
// Object.defineProperty(a, 'a', {
//   writable: false,
// })
// console.log(a.a)

// a.a = 10

// var a = {
//   a: undefined
// }

// console.log(a.a)
// console.log(a.b)

// function old() {
//   let name = 'hh'
//   console.log('===', name)
//   return {
//     name
//   }
// }

// let a = old

// let b = new a()
// b.he = 'xx'
// delete b.name

// console.log('he' in b)
// console.log('he' in a)

// console.log('name' in b)
// console.log(b.hasOwnProperty('name'))
// console.log('name' in a)

// var myArray = [ 1, 2, 3 ];
// var it = myArray[Symbol.iterator]();
// console.log(it.next()); // { value:1, done:false }
// console.log(it.next()); // { value:2, done:false }
// console.log(it.next()); // { value:3, done:false }
// console.log(it.next()); // { done:true }
// console.log(it.next()); // { done:true }
// let anyObj = { a: 2 }
// // Object.defineProperty(anyObj, 'a', {
// //   writable: true
// // })
// let myObj = Object.create(anyObj)
// myObj.a ++
// console.log(anyObj)
// console.log(myObj)
// console.log(myObj.a)
// console.log('a' in myObj)
// console.log(myObj.hasOwnProperty('a'))

// function Foo() {
//    console.log('//===')
// }
// console.log(Foo.prototype)
// console.log(Foo.prototype.constructor == Foo)
// Foo.prototype = {}
// var a = new Foo()
// console.log(a.constructor == Foo)
// console.log(a.constructor == Object)

// function Foo() {
// }

// function Bar() {
// }

// Bar.prototype = Foo.prototype

// var a = new Bar()
// a.name = 'xxx'
// console.log(a)

// class A {
//   name = 'AA'
//   age = 20
//   constructor(l) {
//     this.l = l
//   }
//   test() {

//   }
// }

// let a = new A('x')
// console.log(a)
// console.log(a.test)
// console.log(A.prototype.age)
// console.log(A.prototype.test)

// function foo(x) {
//   x = x + 1;
//   x; // 3
// }
// var a = 2;
// var b = new Number( a ); // Object(a)也一样
// foo( b );
// console.log( b ); // 是2，不是3
// console.log( a ); // 是2，不是3

// function foo(x) {
//   x = x + 1;
//   x; // 3
//   return x
// }
// var a = 2;
// foo( a );
// console.log( a ); // 是2，不是3

// var a = "hello world";

// ~a.indexOf('lo')
// console.log(~a.indexOf('lo'))
// if (~a.indexOf('lo')) {
//   console.log('QQ')
// }

// let a = 49999.6
// console.log(a | 2)
// console.log(~~a)
// console.log(Math.ceil(a))

// console.log(parseInt( 1/0, 19 ))
// console.log(parseInt( "I", 19 ))
// console.log(parseInt(new String('42')))
// console.log(parseInt( 0.000008 ));
// console.log(parseInt( 0.0000009 ));
// console.log(parseInt( "0x10" , 16));
// console.log(parseInt('42px'))

// var i = 2;
// Number.prototype.valueOf = function() {
//     return i ++
// }

// let a = new Number(42)

// if (a == 2 && a == 3) {
//     console.log('aaa')
// }

// var a, b;
// a = eval('if (true) { b = 4 + 38 }')
// console.log(a)
// console.log(b)
// function foo() {
//     a = a + 1;
// }
// var a = 1;
// foo();
// console.log(a);
// function foo () {
//     bar: {
//         console.log('hello');
//         break bar;
//         console.log('aaa');
//     }
//     console.log('world');
// }

// foo()
// var a = 42;
// var b = "foo";
// var c = false;
// var d = (a && b || c) ? (c || b) ? a : (c && b) : a
// console.log(d)
// if (a && b || c) {
//     if (c||b) {
//         console.log('aa')
//     }
// }

// let a = true ? false : true ? true : true;
// console.log(a)

// var a = 42;
// var b = "foo";
// var c = false;
// var d = (a && b || c) ? ((c || b) ? a : (c && b)) : a
// console.log(d)

// {
//     typeof a;
//     typeof b;
//     let b;
// }

// function foo() {
//     try {
//         console.log("11")
//         console.log("11")
//         console.log("11")
//         console.log("11")
//         return 42;
//     }
//     finally {
//         console.log('aa')
//     }
//     console.log('aaa')
// }

// console.log(foo());

// window.escape( "? foo=97%&bar=3%" )

// using a resolved promise, the 'then' block will be triggered instantly,
// but its handlers will be triggered asynchronously as demonstrated by the console.logs
// const resolvedProm = Promise.resolve(33);

// let thenProm = resolvedProm.then(value => {
//     console.log("this gets called after the end of the main stack. the value received and returned is: " + value);
//     return value;
// });
// // instantly logging the value of thenProm
// console.log(thenProm);

// // using setTimeout we can postpone the execution of a function to the moment the stack is empty
// setTimeout(() => {
//     console.log(thenProm);
// });

// Object.prototype.then = function(){};
// Array.prototype.then = function(){};
// var v1 = { hello: "world" };
// var v2 = [ "Hello", "World" ];

// let a = new Promise((resolve, reject) => {
//   resolve(v2)
// })
// a.then(res => {
//   console.log(res)
// })

// var p3 = new Promise( function(resolve,reject){
//   resolve( 'B' );
// } );
// var p1 = new Promise( function(resolve,reject){
//   resolve( p3 );
// } );
// p2 = new Promise( function(resolve,reject){
//   resolve( "A" ,'ss');
// } );
// p1.then( function(v){
//   console.log('1', v );
// } ).then(v => {
//   console.log('3', v)
// })
// p2.then( function(v){
//   console.log( v );
// } ).then(v => {
//   console.log('2', v)
// })

// let a= new Promise((resolve, reject) => {
//   resolve(1)
// })

// a.then((result) => {
//   a.foo()
//   console.log(result)
// }).then(res => {
//   console.log('2', res)
// }, err => {
//   console.log('3', err)
// })

// var p1 = Promise.resolve( 42 );
// var p2 = Promise.resolve( p1 );
// console.log(p1 === p2)

// var p = {
//   then: function(cb,errcb) {
//       cb( 42 );
//       errcb( "evil laugh" );
//   }
// };
// p.then(
//   function fulfilled(val){
//     console.log( val ); // 42
//   },
//   function rejected(err){
//     // 啊，不应该运行!
//     console.log( err ); // 邪恶的笑
//   }
// );
// Promise.resolve(p).then(
//   function fulfilled(val){
//     console.log( val ); // 42
//   },
//   function rejected(err){
//     // 啊，不应该运行!
//     console.log( err ); // 邪恶的笑
//   }
// );

// var p = Promise.resolve('2')
// var p1 = p.then(res => {
//   return res * 2
// })
// console.log(p)
// console.log(p1)
// p1.then(res => {
//   console.log('1', res)
// })

// let a = function () {
//   setTimeout(() => {
//     foo()
//   }, 100)
// }
// function foo() {
//   setTimeout( function(){
//       baz.bar();
//   }, 100 );
// }
// try {
//   // foo()
//   a()
//   console.log("==")
// } catch (e) {
//   console.log('e', e)
// }

// var x = 1
// function *foo() {
//   x++;
//   yield;
//   console.log('x: ', x)
// }
// function bar() {
//   x++;
// }
// var it = foo()
// it.next()
// console.log(x)
// console.log(it.value)
// bar()
// console.log(x)
// it.next()

// function *foo(x) {
//   return x * (yield)
// }
// var a = foo(6)
// a.next()
// var res = a.next(7)
// console.log(res.value)

// var a = 1;
// var b = 2;
// function *foo() {
//     a++;
//     yield;
//     b = b * a;
//     a = (yield b) + 3;
// }
// function *bar() {
//     b--;
//     yield;
//     a = (yield 8) + b;
//     b = a * (yield 2);
// }
// function step(gen) {
//   let it = gen()
//   let last
//   return function() {
//     last = it.next(last).value
//   }
// }
// a = 1;
// b = 2;
// var s1 = step( foo );
// var s2 = step( bar );
// // 首次运行*foo() s1();
// s1();
// s1();
// s1();
// // 现在运行*bar() s2();
// s2();
// s2();
// s2();
// s2();
// console.log(a, b)

// let a = 1
// function something() {
//   return {
//     [Symbol.iterator]: function() {
//       return this
//     },
//     next() {
//       const v = a++
//       return {done: false, value: v}
//     }
//   }
// }
// function *something() {
//   try {
//     let nextValue
//     while(true) {
//       if (!nextValue) {
//         nextValue = 1
//       } else {
//         ++nextValue
//       }
//       yield nextValue
//     }
//   } finally {
//     console.log('end')
//   }
// }
// // for(let v of something()) {
// //   if (v > 10) {
// //     break;
// //   }
// //   console.log(v)
// // }
// let it = something()
// for(let v of it) {
//   console.log(v)
//   if (v > 10) {
//     it.return('dd')
//   }
// }


// function asyncTest(a,b) {
//   setTimeout(() => {
//     it.throw(a+b)
//   }, 3000)
// }
// function *main() {
//  try {
//   var text = yield asyncTest(2,3)
//   console.log(text)
//  } catch(e) {
//    console.log('ee', e)
//  }
// }
// var it = main()
// it.next()



// function *main() {
//   var x = yield "Hello World";
// // 永远不会到达这里
//   console.log( x );
// }
// var it = main();
// it.next();
// try {
//   it.throw( "Oops" );
// }
// catch (err) {
// // 不行，没有处理! 
// console.error('ss', err );
// // Oops
// }


// function asyncTest(a,b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a+b)
//     }, 3000)
//   })
// }
// function *main() {
//  try {
//   var text = yield asyncTest(2,3)
//   console.log('res: ',text)
//  } catch(e) {
//    console.log('ee', e)
//  }
// }
// var it = main()
// var p = it.next().value
// p.then((res) => {
//   it.next(res)
// })



// function asyncTest(a,b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a+b)
//     }, 3000)
//   })
// }
// function *main(a,b) {
//  try {
//   var text = yield asyncTest(a,b)
//   console.log('res: ',text)
//  } catch(e) {
//    console.log('ee', e)
//  }
// }
function run(gen) {
  let args = [].slice.call(arguments, 1)
  let it = gen.apply(this, args)
  return Promise.resolve().then(
    function handleNext(value) {
      var next = it.next(value)
      console.log('next1', next, value)
      return (function handleResult(next) {
        console.log('next', next)
        if (next.done) {
          return next.value
        }
        return Promise.resolve(next.value).then(
          function handleNext(value) {
            return handleResult(it.next(value))
          },
          function handleThrow(error) {
            return handleResult(it.throw(error))
          }
        )
      })(next)
    }
  )
}
// run(main, 2, 3)



// function asyncTest(a,b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a+b)
//     }, 3000)
//   })
// }
// async function main(a,b) {
//  try {
//   var text = await asyncTest(a,b)
//   console.log('res: ',text)
//  } catch(e) {
//    console.log('ee', e)
//  }
// }
// main(2,3)


// function p1 () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(3)
//     }, 3000)
//   })
// }
// function p2 () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2)
//     })
//   }, 2000)
// }
// function p3 (a,b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b)
//     })
//   }, 2000)
// }

// function *main() {
//   try {
//     var x = yield p1()
//     console.log(x)
//     var y = yield p2()
//     console.log(y)
//     var z = yield p3(x,y)
//     console.log(z)
//   } catch (e) {
//     console.log('===', e)
//   }
// }
// run(main)


// function *bar() {
//   yield "A"
//   yield *[ "B", "C", "D" ]
//   yield "E"
//   // console.log( "inside *bar():", yield "A" );
//   // // yield委托给非生成器!
//   // console.log( "inside *bar():", yield *[ "B", "C", "D" ] );
//   // console.log( "inside *bar():", yield "E" );
//   return "F";
// }
// var it = bar();
// console.log( "outside:", it.next().value );
// // outside: A
// console.log( "outside:", it.next( 1 ).value );
// // inside *bar(): 1
// // outside: B
// console.log( "outside:", it.next( 2 ).value );
// // outside: C
// console.log( "outside:", it.next( 3 ).value );
// // outside: D
// console.log( "outside:", it.next( 4 ).value );
// // inside *bar(): undefined
// // outside: E
// console.log( "outside:", it.next( 5 ).value );
// // inside *bar(): 5
// // outside: F


// function *foo() {
//   yield "B"
//   yield "C"
//   // console.log( "inside *foo():", yield "B" );
//   // console.log( "inside *foo():", yield "C" );
//   return "D"; 
// }
// function *bar() {
//   yield "A"
//   yield *foo()
//   yield "E"
//   // console.log( "inside *bar():", yield "A" );
//   // // yield委托!
//   // console.log( "inside *bar():", yield *foo() );
//   // console.log( "inside *bar():", yield "E" );
//   return "F";
// }
// var it = bar();
// console.log( "outside:", it.next().value );
// // outside: A
// console.log( "outside:", it.next( 1 ).value );
// // inside *bar(): 1
// // outside: B
// console.log( "outside:", it.next( 2 ).value );
// // inside *foo(): 2
// // outside: C
// console.log( "outside:", it.next( 3 ).value );
// // inside *foo(): 3
// // inside *bar(): D
// // outside: E
// console.log( "outside:", it.next( 4 ).value );
// // inside *bar(): 4
// // outside: F



// function fooASM(stdlib, foreign, heap) {
//   "use asm";
//   var arr = new stdlib.Int32Array(heap);
//   function foo(x, y) {
//     x = x | 0;
//     y = y | 0;
//     var i = 0;
//     var p = 0;
//     var sum = 0;
//     var count = ((y | 0) - (x | 0)) | 0;
//     // 计算所有的内部相邻数乘积 
//     for (i = x | 0;
//       (i | 0) < (y | 0); p = (p + 8) | 0, i = (i + 1) | 0) {
//       // 存储结果
//       arr[p >> 3] = (i * (i + 1)) | 0;
//     }
//     // 计算所有中间值的平均数 
//     for (i = 0, p = 0;
//       (i | 0) < (count | 0); p = (p + 8) | 0, i = (i + 1) | 0) {
//       sum = (sum + arr[p >> 3]) | 0;
//     }
//     return +(sum / count);
//   }
//   return {
//     foo: foo
//   };
// }
// var heap = new ArrayBuffer(0x1000);
// var foo = fooASM(window, null, heap).foo;
// console.log(foo(10, 20)); // 233

// 闭包测试
function makeAdder(x) {
  function add(y) {
    return y + x
  }
  return add
}

let plusOne = makeAdder(1)
let plusTen = makeAdder(10)

console.log(plusOne(3))
console.log(plusOne(10))
console.log(plusTen(10))
