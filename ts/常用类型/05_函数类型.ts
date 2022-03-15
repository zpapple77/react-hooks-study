//函数声明
function add1(num1: number, num2: number): number {
  return num1 + num2
}

// 箭头函数
  const add2 = (num1: number, num2: number): number => {
    return num1 + num2
  }

// 同时指定参数，返回值的类型
type AddFn = (num1: number, num2: number) => number

const add3: AddFn = (num1, num2) => {
  return num1 + num2
}
