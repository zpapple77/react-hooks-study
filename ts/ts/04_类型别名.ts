{
  // 当同一类型（复杂）被多次使用时，可以通过类型别名，简化该类型的使用
  type CustomArray = (number | string)[]

  let arr1: CustomArray = [1, 'a', 3, 'b']
  let arr2: CustomArray = ['x', 'y', 6, 7]
}
