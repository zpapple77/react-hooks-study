import React from 'react'
import ReactDOM from 'react-dom'
import Mouse from './Mouse'
import Dog from './Dog'
import Position from './Position'
import Scroll from './Scroll'
const element = (
  <div style={{height:10000,width:10000}}>
    <h1>根组件</h1>
    {/* <Mouse>{({ x, y }) => <Dog x={x} y={y}></Dog>}</Mouse>
    <Mouse>{(state) => <Position {...state}></Position>}</Mouse> */}
    <Scroll>
      {({ left, top }) => (
        <div style={{position:'fixed'}}>
          {left}-{top}
        </div>
      )}
    </Scroll>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
