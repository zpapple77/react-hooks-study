import { ADD_MONEY,BUY } from "./action_type"
//挣钱
export const addMoney = (money)=>{
    return {
        type:ADD_MONEY,
        money,
    }
}

export const buy = (money)=>{
    return {
        type:BUY,
        money,
    }
}

//如果是同步action，直接返回一个action对象
//如果是异步action，需要返回一个异步函数，在异步函数种，处理完成之后，需要在异步函数中dispatch
export const buyAsync = (money) => {
    return (dispatch)=>{
        setTimeout(() => {
            // dispatch({
            //     type:"BUY",
            //     money
            // })
            dispatch(buy(money))//直接调用上面的buy
        }, 3000);
    }
}