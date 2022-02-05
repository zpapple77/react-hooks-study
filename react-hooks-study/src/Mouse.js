//作用：用于提供鼠标位置的逻辑，不服者去渲染结构
import { Component } from 'react'

export default class Position extends Component {
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
    // @ts-ignore
    return this.props.children(this.state)
  }
}
