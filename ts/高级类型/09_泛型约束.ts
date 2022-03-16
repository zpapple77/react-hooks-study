{
  interface ILength {
    length: number
  }
  function fn<Type extends ILength>(value: Type): Type {
    // console.log(value.length)//在不继承的情况下，Type上不存在；length属性
    console.log(value.length)
    return value
  }
  fn<string>('abc')

  function setElement<Type extends HTMLElement>(element: Type): Type {
    console.log(element.innerHTML)
    return element
  }

  const a = document.createElement('a')
  setElement(a)

  //指定多个泛型类型
  //传的key必须是Type中的某一个key
  function getProperty<Type,Key extends keyof Type>(obj:Type,key:Key){
      return obj[key]
  }
  const user = {
      name:'zs',
      age:18
  }
  getProperty(user,'name')
}
