{
  // 需求：数组中既有 number 类型，又有 string 类型，这个数组的类型应该如何写?
  let arr1: (number | string)[] = [1, 'a', 3, 'b']

  // - 解释：|（竖线）在 TS 中叫做联合类型，即：由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种
  // - 注意：这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（|| 或）混淆了

  let timer: number | null = null
  timer = setInterval(() => {}, 100)//赋值定时器id码

  //定义一个数组，数组中可以有数字或者字符串
  let arr2:number|string[] = 100
  arr2=['nihao','js']
}
