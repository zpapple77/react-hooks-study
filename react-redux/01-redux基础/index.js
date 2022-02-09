import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
/**
 * react-redux的使用步骤
 * 1.安装 npm i react-redux
 * 2.导入Provider组件 并且使用Provider包裹App组件
 * 3.在任意的子组件种都可以获取到store
 */
ReactDOM.render(
  //Provider是所有组件的父组件，当store发生变化了 可以让子组件更新
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
