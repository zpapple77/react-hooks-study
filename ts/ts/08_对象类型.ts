{
  //在ts中提供了一种新的语法：接口
  //接口九尾专门用于提供对象的类型
  //interface接口的名字{对象描述}
  interface User {
    name: string
    age: number
    sayHi(): number
    add(n1: number, n2: number): number
    // add2:(n1:number,n2:number)=>number与上面的等价
  }

  const user: User = {
    name: 'zs',
    age: 19,
    sayHi() {
      console.log('nihao')
      return 1
    },
    add(n1, n2) {
      return n1 + n2
    },
  }
}
