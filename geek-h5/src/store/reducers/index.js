import { combineReducers } from 'redux'
import { article } from './article'
import { home } from './home'
import { login } from './login'
import { profile } from './profile'
import { search } from './search'

const rootReducer = combineReducers({
  login,
  profile,
  search,
  article,
  home
})

export default rootReducer
