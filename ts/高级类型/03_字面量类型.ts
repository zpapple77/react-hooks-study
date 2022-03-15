{
  //str的类型：string
  let str: string = 'hello'

  //str2的类型：hello，字面量类型
  const str2 = 'hello'
  //等价于
  const str3: 'hello' = 'hello'

  //使用模式：字面量类型配合联合类型一起使用
  // - 比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个

  // 使用自定义类型:
  type Direction = 'up' | 'down' | 'left' | 'right'

  function changeDirection(direction: Direction) {
    console.log(direction)
  }

  // 调用函数时，会有类型提示：
  changeDirection('up')

  // - 解释：参数 direction 的值只能是 up/down/left/right 中的任意一个
  // - 优势：相比于 string 类型，使用字面量类型更加精确、严谨
}
