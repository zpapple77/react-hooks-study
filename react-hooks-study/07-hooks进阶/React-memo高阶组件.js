/**
 * 1. 使用useRef能够创建一个ref对象，有current属性 {current：null}  const xxRef = useRef(null)
 * 2. 通过ref属性关联到某个DOM对象上，（current：DOM） <div ref = {xxRef}></div>
 * 3. 可以通过xxRef.current访问到对应的DOM
 */
import React, { useState, memo } from 'react'
import ReactDOM from 'react-dom'
const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>我是父组件</h2>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点击
      </button>
      <Child1 
// @ts-ignore
      count={count}></Child1>
      <Child2></Child2>
    </div>
  )
}
// @ts-ignore
const Child1 = memo(({ count }) => {
  console.log('Child1更新')
  return <div>Child1组件{count}</div>
})
const Child2 = memo(() => {
  console.log('Child2更新')
  return <div>Child2组件</div>
}
)
ReactDOM.render(<App></App>, document.getElementById('root'))
