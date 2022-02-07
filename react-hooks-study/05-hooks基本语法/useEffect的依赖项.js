import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count,setCount] = useState(0)
  const [money,setMoney] = useState(100)
  //useEffect参数一：回调函数
  //useEffect参数二：数组，useEffect的依赖项，如果指定了依赖项，
  // 回调函数只会在依赖项发生了改变的时候才会执行，该参数可以省略
  useEffect(() => {
    console.log('我执行了');
    document.title = `点击了${count}`
  },[count])//依赖了count，只有count发生变化的时候才会执行
 return (
   <div>
     <h3>根组件</h3>
     <div>我被点击了{count}次</div>
     <div>我有{money}元</div>
     <button onClick={()=>{setCount(count+1)}}>点击</button>
     <button onClick={()=>{setMoney(money+100)}}>加钱</button>
   </div>
 )
}

ReactDOM.render(<App />, document.getElementById('root'))
