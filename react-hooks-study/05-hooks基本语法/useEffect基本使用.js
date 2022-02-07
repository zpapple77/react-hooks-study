import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count, setCount] = useState(0)
  //参数是一个函数，这个组件会在组件渲染好的时候执行（componentDidMount+componentDidUpdata）
  useEffect(()=>{
    document.title=`当前点击了${count}次`
    console.log('我执行了');
  })
  return (
    <div>
      <h1>根组件</h1>
      <div>点击次数:{count}</div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +1
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
