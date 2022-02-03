import React, { Component } from 'react'
import img from './dog.jpg'

export default class Dog extends Component {
  state = {
    x: 1,
    y: 0,
  }
  move = (e) => {
    console.log(e.pageX, e.pageY)
    this.setState({
      x: e.pageX,
      y: e.pageY,
    })
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.move)
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.move)
  }
  render() {
    return (
      <div>
        <img
          src={img}
          alt=""
          style={{
            width: 100,
            height: 100,
            left: this.state.x,
            top: this.state.y,
            position:'absolute'
          }}
        />
      </div>
    )
  }
}
