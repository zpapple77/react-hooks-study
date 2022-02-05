import React from 'react'
//参数：接收一个普通组件 
export default function withMouse(Base) {
  class Mouse extends React.Component {
    state = {
      x: 0,
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
      return <Base {...this.props}{...this.state}></Base> 
    }
  }
  return Mouse
}
