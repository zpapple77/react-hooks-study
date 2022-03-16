{
  interface MyArray<Type> {
    length: number
    push?(n: Type): void
    pop?(): Type
    reverse?(): Type[]
  }
  const arr: MyArray<number> = {
    length: 10,
    push(n: number) {
      console.log(n)
    },
    pop() {
      return 100
    },
    reverse() {
      return [1, 2, 3]
    },
  }
  arr.push?.(132)
  const arr2:MyArray<number> ={
    length:122
  }
}
