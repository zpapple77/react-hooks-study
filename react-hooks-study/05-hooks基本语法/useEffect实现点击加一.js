import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count,setCount] = useState(0)
  useEffect(() => {
    document.title = `点击了${count}`
  })
 return (
   <div>
     <h3>根组件</h3>
     <div>我被点击了{count}次</div>
     <button onClick={()=>{setCount(count+1)}}>点击</button>
   </div>
 )
}

ReactDOM.render(<App />, document.getElementById('root'))
