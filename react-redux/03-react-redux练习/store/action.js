//挣钱
export const addMoney = (money)=>{
    return {
        type:'ADD_MONEY',
        money,
    }
}

export const buy = (money)=>{
    return {
        type:'BUY',
        money,
    }
}