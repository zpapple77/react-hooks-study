import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
const App = () => {
  const [money, setMoney] = useState(1000)
  const total = useMemo(() => {
    console.log('did i acted');
    return Array.from(new Array(money))
      .map((item, index) => index + 1)
      .reduce((prev, item) => prev + item, 0)
  }, [money])
  return (
    <div>
      <h1>根组件-{total}</h1>
      <div>{money}</div>
      <button onClick={() => setMoney(money + 100)}>加钱</button>
    </div>
  )
}
ReactDOM.render(<App></App>, document.getElementById('root'))
