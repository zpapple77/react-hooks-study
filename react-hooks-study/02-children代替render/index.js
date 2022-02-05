import React from 'react'
import ReactDOM from 'react-dom'
import Mouse from './Mouse'
import Dog from './Dog'
import Position from './Position'
const element = (
  <div>
    <h1>根组件</h1>
    <Mouse>{({ x, y }) => <Dog x={x} y={y}></Dog>}</Mouse>
    <Mouse>{(state) => <Position {...state}></Position>}</Mouse>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
