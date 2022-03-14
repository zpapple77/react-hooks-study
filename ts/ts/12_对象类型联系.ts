interface IUser {
  name: string
  age: number
  // sayHi():void
  sayHi: () => void
}

function printInfo(user: IUser): void {
  console.log(user.name)
  console.log(user.age)
  user.sayHi()
}
printInfo({
  name: 'zs',
  age: 18,
  sayHi() {
    console.log('nihao')
  },
})
