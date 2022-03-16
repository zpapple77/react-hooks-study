//partial
type User = {
    name:string
    age:number
    gender:string
}

//接收一个类型，返回一个新类型，并且会让新类型中的所有属性变成可选的
type partialUser = Partial<User>

// const user:User={

// }


//readonly 返回一个新类型，新类型中的所有属性都是只读的，
type ReadOnlyUser = Readonly<User>

const user:ReadOnlyUser={
    name:'zs',
    age:23,
    gender:'nan'
}
// user.name='ls'

// Pick<Type, Keys> 从 Type 中选择一组属性来构造新类型。
interface Props {
    id: string
    title: string
    children: number[]
  }
  type PickProps = Pick<Props, 'id' | 'title'>

  const p:PickProps={
      id:'qqq',
      title:'sasa'
  }

// Omit<K,T>类型让我们可以从另一个对象类型中剔除某些属性，并创建一个新的对象类型：

// K：是对象类型名称，T：是剔除K类型中的属性名称