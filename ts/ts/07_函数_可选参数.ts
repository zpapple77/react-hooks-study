// - 使用函数实现某个功能时，参数可以传也可以不传。这种情况下，在给函数参数指定类型时，就用到可选参数了
// - 比如，数组的slice方法，可以slice()也可以slice(1)还可以slice(1, 3)
function mySlice(start?: number, end?: number): void {
  console.log('起始索引：', start, '结束索引：', end)
}
mySlice(1, 10)
// - 可选参数：在可传可不传的参数名称后面添加 `?`（问号）
//注意：可选参数只能出现在参数列表的最后，也就是说可选参数后面不能再出现必选参数

//也可以在形参列表直接传递好默认参数
function mySlice2(start: number = 0, end: number = 9): void {
  console.log('起始索引：', start, '结束索引：', end)
}
mySlice2()

/**
 * 起始索引： 1 结束索引： 10
 * 起始索引： 0 结束索引： 9
 */
