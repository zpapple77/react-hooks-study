import ReactDOM from 'react-dom'
import img from './dog.jpg'
import useMouse from './useMouse'
import useScroll from './useScroll'
function Dog() {
  const { x, y } = useMouse()
  return (
    <img
      src={img}
      style={{ position: 'absolute', left: x, top: y, width: 100, height: 100 }}
      alt=""
    />
  )
}
function Position() {
  const { x, y } = useMouse()
  const { left, top } = useScroll()
  return (
    <div style={{width:10000,height:10000}}>
      <h3>
        当前位置:{x},{y}
      </h3>
      <h3>
        滚动位置:{left},{top}
      </h3>
    </div>
  )
}
ReactDOM.render(<Position></Position>, document.getElementById('root'))
