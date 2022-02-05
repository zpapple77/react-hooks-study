import React from 'react'
import ReactDOM from 'react-dom'
import Position from './Position'
import Dog from './Dog'
import withMouse from './withMouse'
import withScroll from './withScroll'


const P = withMouse(withScroll(Position))
const element = (
  <div style={{width:1000,height:1000}}>
    <h1>根组件</h1>
    {/* <DogWithMouse></DogWithMouse> */}
    <P></P>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
