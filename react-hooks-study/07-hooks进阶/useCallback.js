/**
 * 1. 使用useRef能够创建一个ref对象，有current属性 {current：null}  const xxRef = useRef(null)
 * 2. 通过ref属性关联到某个DOM对象上，（current：DOM） <div ref = {xxRef}></div>
 * 3. 可以通过xxRef.current访问到对应的DOM
 */
import React, { useState, memo, useMemo } from 'react'
import ReactDOM from 'react-dom'
const App = () => {
  const [count, setCount] = useState(5)
  const [money, setMoney] = useState(1000)
  //记忆的函数=useCallback（函数，[依赖]）
  //只要依赖项不变，这个函数就不会变化，如果依赖项变了，这个函数就会变化
  const help = useMemo(() => {
    return () => {
      setCount(count + 1)
    }
  }, [count])
  return (
    <div>
      <h2>我是父组件-{count}</h2>
      <h2>金钱-{money}</h2>
      <button
        onClick={() => {
          setCount(count - 1)
        }}
      >
        打豆豆
      </button>
      <button onClick={() => setMoney(money + 100)}>挣钱</button>
      {count > 0 ? (
        <Child1
          // @ts-ignore
          count={count}
          help={help}
        ></Child1>
      ) : (
        '豆豆被打死了'
      )}
      <hr />
    </div>
  )
}
// @ts-ignore
const Child1 = memo(({ count, help }) => {
  console.log('Child1更新')
  return (
    <div>
      <h3>豆豆被打了{count}</h3>
      <button onClick={help}>续命</button>
    </div>
  )
})
ReactDOM.render(<App></App>, document.getElementById('root'))
