import { createStore,applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from 'redux-thunk'

/**
 * 1.安装 npm i redux-thunk
 * 2.导入包
 * 3.应用中间件createStore(reducer,applyMiddleware(thunk))
 * 4.去action写异步代码
 */

// @ts-ignore
//参数1：指定redux
//参数2：使用中间件
const store = createStore(reducer,applyMiddleware(thunk))
export default store