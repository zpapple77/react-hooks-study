import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//class组件实现加一
// class App extends React.Component {
//   state = {
//     count: 0,
//   }
//   render() {
//     return (
//       <div>
//         <h1>根组件</h1>
//         <div>点击次数:{this.state.count}</div>
//         <button onClick={this.add}>+1</button>
//       </div>
//     )
//   }
//   add = () => {
//       this.setState({
//           count:this.state.count+1,
//       })
//   }
// }
// ReactDOM.render(<App />, document.getElementById('root'))

//使用hook实现---useState()
function App() {
    //useState()参数：初始值
    //返回值：就是一个数组，长度为2
    //数组下标0：就是这个状态  数组下标1：修改这个状态的函数
 const [count,setCount]=useState(0)//解构
//  const count = res[0]
//  const setCount = res[1]
  return (
    <div>
      <h1>根组件</h1>
      <div>点击次数:{count}</div>
      <button onClick={()=>{setCount(count+1)}}>+1</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
