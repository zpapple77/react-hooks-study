import React, { Component } from 'react';

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
    return (<div>
        <h3>当前鼠标的位置</h3>
        <div>({this.state.x},{this.state.y})</div>
    </div>);
  }
}
