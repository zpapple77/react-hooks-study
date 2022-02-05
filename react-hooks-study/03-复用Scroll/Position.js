import React, { Component } from 'react'

export default class Position extends Component {
  render() {
    return (
      <div>
        <h3>当前鼠标的位置</h3>
        <div>
          {/* 这里直接从props里面去拿值 */}
          ({this.props.x},{this.props.y})
        </div>
      </div>
    )
  }
}
