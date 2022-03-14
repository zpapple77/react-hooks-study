//:number 类型的注解
//作用：明确的指定一个变量的类型，变量的类型是不允许修改的

/**
 * 1. JS 已有类型
  - 原始类型：`number/string/boolean/null/undefined/symbol`
  - 对象类型：`object`（包括，数组、对象、函数等对象）
 */
let num: number = 11
console.log(num)

num = 20 //ok
// num='nihao'//报错
