import { Component } from 'react';

export default function withScroll(Base) {
    //逻辑
    
    class Scroll extends Component {
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
        render(){
            return <Base {...this.props}{...this.state}></Base>
        }
    }
    return Scroll
}