{
  // 泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用
//   function fn(value: number): number {
//     console.log(value)
//     return value
//   }

//   fn(1)


//定义泛型函数
function fn<Type>(value:Type):Type{
    console.log(value);
    return value
}

//使用泛型函数
let res = fn<number>(10)  //10
let res2 = fn<string>('abd')//abd
let res3 = fn('abc')//abc,类型推断

}
