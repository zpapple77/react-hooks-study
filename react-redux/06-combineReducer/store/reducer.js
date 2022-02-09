import { ADD_MONEY,BUY } from "./action_type"
import {combineReducers} from 'redux'

//用于处理user模块
function user(state={name:'管理',age:20},action){
    return state
}

function money (state = 1000,action){
    if(action.type===ADD_MONEY){
        return state+action.money
    }
    if(action.type===BUY){
        return state-action.money
    }
    return state
}
const rootReducer = combineReducers({
    user,
    money
})
export default rootReducer
