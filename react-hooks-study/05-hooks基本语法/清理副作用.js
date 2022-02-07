import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h3>根组件</h3>
      <div>我被点击了{count}次</div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        打豆豆
      </button>
      {count < 5 ? <Child count={count}></Child> : '豆豆被打死了'}
    </div>
  )
}
function Child({ count }) {
  //开启定时器，打印
  //
  useEffect(() => {
    let timer = window.setInterval(() => {
      console.log('我是豆豆 别打我')
    }, 1000)
    //返回的函数称为清理副作用的函数
    //这个函数会在组件销毁的时候执行（componenWillUnmount）
    // 以及回调每次执行之前执行。
    return () => {
      console.log('act')
      clearInterval(timer)
    }
  }, [])
  return (
    <div>
      <h3>我是子组件---{count}</h3>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
