//获取窗口滚动条的位置

import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Scroll extends Component {
    static propTypes = {
        children :PropTypes.func.isRequired//必须穿children而且必须是函数
    }
    state = {
        top:0,
        lesft:0
    }
    componentDidMount(){
        window.addEventListener('scroll',this.scroll)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll)
    }
    scroll = () => {
        this.setState({
            left:window.pageXOffset,
            top:window.pageYOffset
        })
    }
  render() {
    // @ts-ignore
    return this.props.children(this.state);
  }
}
