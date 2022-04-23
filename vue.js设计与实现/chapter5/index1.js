const obj = { 
  get foo() {
    return this.bar
  }
}
console.log(obj.foo)
console.log(Reflect.get(obj, 'foo'))
console.log(Reflect.get(obj, 'foo', {bar: '22'}))

var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.bar + this.foo;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

console.log(Reflect.get(myObject, 'baz', myReceiverObject)) // 8