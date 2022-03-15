{
  type Teacher = {
    name: string
    age: number
    sayHi(): void
    sleep?(time: number): number//可选属性
  }
  //基本使用，通过{}就可以指定对象的类型
  let tea: Teacher = {
    name: '张三',
    age: 20,
    sayHi() {
      console.log('123')
    },
    sleep(time) {
      return time + 1000
    },
  }
  let tea2: Teacher = {
    name: 'liulaoshi',
    age: 30,
    sayHi() {
      console.log('456')
    },
    // sleep(time) {
    //   return time + 2000
    // },
  }
  //   teacher.age.valueOf()
}
