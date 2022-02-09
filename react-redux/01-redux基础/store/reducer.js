
function reducer (state = 0,action){
    if(action.type==='ADD')return state+1
    if(action.type==='MINUS')return state-1
    return state
}

export default reducer