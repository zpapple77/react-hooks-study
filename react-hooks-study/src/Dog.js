import img from './dog.jpg'

import React from 'react';

// export default function Dog(props){//直接拿到props
export default function Dog({x,y}){//将拿到的props参数解构为x，y
  return (
    <div>
      <img
        src={img}
        alt=""
        style={{
          width: 100,
          height: 100,
          // left: props.x,
          // top:props.y,
          left:x,
          top:y,
          position:'absolute'
        }}
      />
    </div>
  )
}
