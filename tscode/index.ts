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

// class Animal {
//   // private name;
//   protected name;
//   public constructor(name) {
//     console.log('11', name)
//     this.name = name;
//     console.log('this.name', this.name)
//   }
// }
// class Cat extends Animal {
//   constructor(name) {
//     super(name);
//     console.log(name);
//     // work with protected
//     console.log(this.name);
//   }
// }
// let a: Cat = new Cat('hah')

// abstract class Animal {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }

// class Cat extends Animal {
//   public sayHi() {
//     console.log('hello hi')
//   }
//   public eat() {
//     console.log(`${this.name} is eating.`);
//   }
// }

// let cat = new Cat('Tom');
// cat.eat()

// function swap<T, U>(tuple: [T, U]): [U, T] {
//   return [tuple[1], tuple[0]];
// }
// let a: [number, string] = [7, 'seven'];
// console.log(swap(a)); // ['seven', 7]
// console.log(a);

// interface Lengthwise {
//   length: number;
// }
// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }
// loggingIdentity([7]);

// function createArray<T = string>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }
// console.log(createArray(10, 's'))

// class GenericNumber<T, A> {
//   zeroValue: T;
//   add: (x: T, y: A) => T;
// }
// let myGenericNumber = new GenericNumber<number, string>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { 
//   console.log('x' + x);
//   console.log('y' + y);
//   return x + Number(y);
// };
// myGenericNumber.add(10, '110')

// interface Alarm {
//   price: number;
// }
// interface Alarm {
//   price: number;  // 类型不一致，会报错
//   weight: number;
// }

// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//       this.greeting = message;
//   }

//   @enumerable(true)
//   greet() {
//       return "Hello, " + this.greeting;
//   }
// }

// function enumerable(value: boolean) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log('target: ' + JSON.stringify(target));  
//     console.log('propertyKey: ' + propertyKey);  
//     console.log('descriptor: ' + descriptor);
//     for(let key in descriptor) {
//       console.log('key: ' + key);
//     } 
//     descriptor.enumerable = value;
//   };
// }

// let a: Greeter = new Greeter('ABC')
// console.log(a.greet())

// function decorateClass<T extends { new (...args: any[]): {} }>(constructor: T){
//   return class B extends constructor{
//     name = 'B'
//   }
// }
// @decorateClass
// class A {
//   name = 'A'
//   constructor() {
//   }
// }
// console.log(new A().name) 

function decorateMethod(target: any,key: string,descriptor: PropertyDescriptor){
  return{
    value: function(...args: any[]){
        var result = descriptor.value.apply(this, args) * 2;
        return result;
    }
  }
}
class A {
  sum1(x: number,y: number){
      return x + y
  }

  @decorateMethod
  sum2(x: number,y: number){
    console.log('xxx', x);
    console.log('yyy', y);
    return x + y
  }
}
console.log(new A().sum1(1,2))  // 输出3
console.log(new A().sum2(1,2))  // 输出6