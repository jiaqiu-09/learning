// let num: number = undefined
// console.log('==', num)
// let some: any = 'test'
// some = 7
// // some.setName("hah")
// console.log(some)
// let myFavoriteNumber;
// myFavoriteNumber = 'seven';
// myFavoriteNumber = 7;
// console.log('myFavoriteNumber' + myFavoriteNumber)
// interface Person {
//   name: string;
//   age: number;
// }
// let tom: Person = {
//   name: 'Tom',
//   age: 10
// };
// console.log(tom)
// interface Person {
//   name: string;
//   age?: number;
//   [propName: string]: string | number;
// }
// let tom: Person = {
//   name: 'Tom',
//   age: 25,
//   gender: 'male'
// };
// function sum(arguments: any) {
//   let args: {
//       [index: number]: number;
//       length: number;
//       callee: Function;
//   } = arguments;
//   // let args: IArguments = arguments;
//   console.log(args)
// }
// sum([1,2,3])
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }
// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//   return source.search(subString) !== -1;
// }
// console.log(mySearch('hah', 'a'))
// function push(array: any[], ...items: any[]) {
//   items.forEach(function(item) {
//       array.push(item);
//   });
// }
// let a = ['2'];
// push(a, 1, 2, 3);
// console.log('aa', a)
// interface Animal {
//   name: string;
// }
// interface Cat {
//   name: string;
//   run(): void;
// }
// let tom: Cat = {
//   name: 'Tom',
//   run: () => { console.log('run') }
// };
// let animal: Animal = tom;
// console.log('animal.name', animal.name)
// function getCacheData(key: string): any {
//   return (window as any).cache[key];
// }
// interface Cat {
//   name: string;
//   run(): void;
// }
// const tom = getCacheData('tom') as Cat;
// tom.run = function () {
//   console.log('aaa')
// };
// interface Animal {
//   name: string;
//   run(): void;
// }
// interface Cat {
//   name: string;
// }
// const animal: Animal = {
//   name: 'tom',
//   run: () => {}
// };
// let tom: Cat = animal;
// console.log('tom', tom.name)
// let tom: [string, number];
// tom = ['Tom', 25];
// tom.push('male');
// // tom.push(true);
// console.log('tom', tom)
// enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
// console.log(Days["Sun"] === 3); // true
// console.log(Days["Wed"] === 3); // true
// console.log(Days[3] === "Sun"); // false
// console.log(Days[3] === "Wed"); // true
// console.log(Days)
// console.log(Days[0])
// console.log(Days[1])
// 可行
// enum Color {Red, Green, Blue = "blue".length};
// 不可行
// enum Color {Blue = "blue".length, Red, Green};
// console.log(Color['Red'])
// console.log(Color['Blue'])
// console.log(Color[4])
// console.log(Color[2])
// console.log(Color[3])
// const enum Directions {
//   Up,
//   Down,
//   Left,
//   Right
// }
// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// // let directions1 = [Directions[0], Directions['Down'], Directions['Left'], Directions['Right']];
// console.log('directions', directions)
// console.log('directions1', Color[0])
// var directions = [Directions.Up, Directions.Down];
// console.log(directions);


// const obj = {
//   // toString() {
//   //   return 'abc';
//   // }
//   name: 'xx',
//   toString() {
//     return this.name + 'xxssa'
//   }
// };
// const sym = Symbol();
// sym // Symbol(abc)
// console.log(Boolean(sym))
// console.log(!sym)

// var obj = new Proxy({}, {
//   get: function (target, propKey, receiver) {
//     console.log('target' + JSON.stringify(target));
//     console.log(`getting ${propKey}!`);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(`setting ${propKey}!`);
//     return Reflect.set(target, propKey, value, receiver);
//   }
// });
// obj.count = 1
// ++ obj.count
// console.log(obj.count)

// let target = {}
// let handler = {}
// let proxy = new Proxy(target, handler)
// proxy.a = 'b'
// console.log(target.a)

// var handler = {
//   get: function(target, name) {
//     if (name === 'prototype') {
//       return Object.prototype;
//     }
//     return 'Hello, ' + name;
//   },

//   // apply: function(target, thisBinding, args) {
//   //   console.log('ooo' + args)
//   //   return args[1];
//   // },

//   call: function(target, thisBinding, args) {
//     return args[1]
//   },

//   construct: function(target, args) {
//     return {value: args[1]};
//   }
// };
// let fun = function(x, y) {
//   console.log('11: ' + x + y)
//   return x + y;
// }
// // console.log(fun(1,2) === fun.apply(this, [1,2]))
// // console.log(fun(1,2) === fun.call(this, 1,2))

// var fproxy = new Proxy(fun, handler);
// fun(1,2)
// console.log(fproxy(1, 2)) // 1
// new fproxy(1, 2) // {value: 2}
// fproxy.prototype === Object.prototype // true
// fproxy.foo === "Hello, foo" // true


// let a = ['20', 10, {name: 'xx'}]
// let handler = {
//   ownKeys: function(target) {
//     console.log(target)
//   }
// }

// let aProxy = new Proxy(a, handler)
// for(let key in aProxy) {
//   console.log('key: ' + key )
//   console.log('value: ' + aProxy[key])
// }

// const proxy = new Proxy({}, {
//   get: function(target, key, receiver) {
//     return receiver;
//   }
// });

// const d = Object.create(proxy);
// d.a = 20
// console.log(d.a === d) // true

// const p = new Proxy(function () {}, {
//   construct: function(target, args) {
//     console.log('called: ' + args.join(', '));
//     return { value: args[0] * 10 };
//   }
// });

// (new p(1, 2)).value

// const obj = function () {

// };
// console.log(obj.a)

// const proxy = new Proxy(obj, {
//   ownKeys: function (target) {
//     // return ['a', 'b'];
//     console.log(Reflect.ownKeys(target))
//     return Reflect.ownKeys(target);
//   }
// });
// for (let key in proxy) {
//   console.log(key);
//   console.log(proxy[key])
// }

// console.log(obj.a)

// var person = {
//   name: "张三"
// };
// var proxy = new Proxy(person, {
//   get: function(target, propKey, receiver) {
//     // console.log(target, propKey, receiver)
//     // console.log(receiver)
//     // console.log(receiver === proxy)
//     if (propKey in target) {
//       console.log('receiver: ' + receiver)
//       // console.log(receiver)
//       // console.log(target, propKey, receiver)
//       return target[propKey];
//       // return receiver;
//     } else {
//       throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
//     }
//   }
// });
// proxy.name // "张三"
// console.log(Reflect.ownKeys(proxy))
// console.log(typeof Reflect.ownKeys(proxy)[0])
// proxy.age // 抛出一个错误


// var p = new Proxy({}, {
//   get: function(target, property, receiver) {
//       console.log("getting: ", property);
//       return target[property];
//   }
// });

// var fn = function(){};
// fn.obj = {};
// var p = new Proxy(fn, {
//     get: function(target, property, receiver) {
//         console.log("getting: ", property);
//         return target.obj[property];
//     }
//   }
// )

// var fn = function(){};
// fn.obj = {};
// fn.toString = function(){ return "fn"; }
// var p = new Proxy(fn, {
//     get: function(target, property, receiver) {
//         console.log("getting: ", property);
//         let result = target.obj[property];
//         if(typeof result === 'function') {
//           result = result.bind(target.obj);
//         }
//         return result;
//     }
// });
// console.log('hello: ' + p)
// console.log('hello: ' + p.toString())
// console.log(p)

// let p = {
//   a: 'a'
// };

// let handler = {
//   set(target, key, value, receiver) {
//     console.log('set');
//     Reflect.set(target, key, value, receiver)
//   },
//   defineProperty(target, key, attribute) {
//     console.log('defineProperty');
//     console.log(target, key, attribute);
//     Reflect.defineProperty(target, key, attribute);
//   }
// };

// let obj = new Proxy(p, handler);
// obj.a = 'A';
// console.log(obj)
// console.log(p)

// 实现观察者模式
const observerQueue = new Set()
const observeFns = fn => observerQueue.add(fn)
const handler = {
  set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    observerQueue.forEach(observe => observe())
    return res
  }
}
const observable = obj => new Proxy(obj, handler)

let person = {
  name: 'xiaoming',
  age: 20
}
observeFns(function () {
  console.log('aaa' + person.name)
})
observeFns(function () {
  console.log('bbb' + person.name)
})
const p = observable(person)

p.name = 'xiaohua'