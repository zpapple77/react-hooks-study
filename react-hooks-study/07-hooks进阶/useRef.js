import ReactDOM from 'react-dom'
import {useRef} from 'react'
const App = () => {
  const add =() => {
    console.log(inputRef.current.value)
  }
  const inputRef = useRef(null)
  return (
    <div>
      <input type="text" placeholder="请输入内容" ref = {inputRef}/>
      <button onClick={add}>添加</button>
    </div>
  )
}

ReactDOM.render(<App></App>,document.getElementById('root'))


/**
 * 1.为什么要有hooks？
 *  1.1 代码逻辑复用mixin（废弃） render-props  HOC hooks 自定义hooks useXXX
 *  1.2 class的缺点class中的this指向总是让人难以理解
 *      考虑到底是使用函数组件还是class组件...需要学习两套组件的用法
 *      class组件不利用代码的压缩和优化
 *      class组件提供了生命周期函数，导致一个功能被拆开到多个钩子函数中
 * 
 * hooks解决了什么问题
 * 1. 逻辑复用
 * 2. 不再使用this
 * 3. 减轻开发者的心智负担，不用考虑组件和类组件
 * 4. 使用函数方便代码压缩和优化（tree shaking）
 * 5. 一个功能写到一起
 * 
 * hooks是16.8开始的...没有准备移除class组件
 * 
 */
