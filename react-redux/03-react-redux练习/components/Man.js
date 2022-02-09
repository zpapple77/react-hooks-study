import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {addMoney} from '../store/action'

export default function Man() {
    const money = useSelector((state)=>state)
    const dispatch = useDispatch()
    console.log(money);
  return (
    <div>
      <div>Man</div>
      <div>金钱:{money}</div>
      <button onClick={()=>dispatch(addMoney(10))}>搬砖+10</button>
      <button onClick={()=>dispatch(addMoney(10000))}>卖身+10000</button>
    </div>  
  )
}
