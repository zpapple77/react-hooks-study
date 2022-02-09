/**
 * 1. 使用useRef能够创建一个ref对象，有current属性 {current：null}  const xxRef = useRef(null)
 * 2. 通过ref属性关联到某个DOM对象上，（current：DOM） <div ref = {xxRef}></div>
 * 3. 可以通过xxRef.current访问到对应的DOM
 */
import React,{ useState ,useContext} from 'react'
import ReactDOM from 'react-dom'
const Context = React.createContext('')
const App = () => {
  const [color, setColor] = useState('red')
  return (
    <Context.Provider value={color}>
      <div>
        <h1>我是根组件</h1>
        <div>颜色：{color}</div>
        <button
          onClick={() => {
            setColor('yellow')
          }}
        ></button>
        <Father></Father>
      </div>
    </Context.Provider>
  )
}
const Father = () => {
  return (
    <div>
      <h2>我是父组件</h2>
      <Child></Child>
    </div>
  )
}
const Child = () => {
  const color = useContext(Context)
  return (
    <Context.Consumer>
      {(color) => (
        <div>
          <h3>我是子组件--{color}</h3>
        </div>
      )}
    </Context.Consumer>
  )
}

ReactDOM.render(<App></App>, document.getElementById('root'))
