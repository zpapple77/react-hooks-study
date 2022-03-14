{
  //基本使用，通过{}就可以指定对象的类型
  let teacher: {
    name: string
    age: number
    sayHi(): void
    sleep(time: number): number
  } = {
    name: '张三',
    age: 20,
    sayHi() {
      console.log('123')
    },
    sleep(time) {
      return time + 1000
    },
  }
//   teacher.age.valueOf()
}
