{
  //因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示
  let obj: any = { x: 0 }

  obj.bar = 100
  obj()
  const n: number = obj
  //以上操作都不会有任何类型错误提示，即使可能存在错误
}
