import { getTokens } from '@/utils'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

let middlewares = applyMiddleware(thunk)

// 需要传入 {}
const composeEnhancers = composeWithDevTools({})
middlewares = composeEnhancers(middlewares)

// 刷新页面时，读取本地缓存中的 tokens
const preloadedState = getTokens()

const store = createStore(
  rootReducer,
  {
    login: preloadedState || {}
  },
  middlewares
)

export default store
