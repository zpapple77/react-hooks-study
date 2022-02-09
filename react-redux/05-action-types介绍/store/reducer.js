import { ADD_MONEY,BUY } from "./action_type"
export default function reducer (state = 1000,action){
    if(action.type===ADD_MONEY){
        return state+action.money
    }
    if(action.type===BUY){
        return state-action.money
    }
    return state
}
