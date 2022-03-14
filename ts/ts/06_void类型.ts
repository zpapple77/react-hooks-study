{
    //如果函数没有返回值，那么，函数返回值类型为：void
  function sayHi(name: string): void {
    console.log('你好', name)
    //一个函数没有返回值，默认返回的undefined
  }

  // 如果什么都不写，此时，add 函数的返回值类型为： void
  const add1 = () => {}
  // 这种写法是明确指定函数返回值类型为 void，与上面不指定返回值类型相同
  const add2 = (): void => {}

  // 但，如果指定 返回值类型为 undefined，此时，函数体中必须显示的 return undefined 才可以
  const add3 = (): undefined => {
    // 此处，返回的 undefined 是 JS 中的一个值
    return undefined
  }
}
