import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {buy, buyAsync} from '../store/action'
export default function Women() {
    const money = useSelector(state=>state)
    const dispatch = useDispatch()
    console.log(money);
  return (
    <div>
      <div>Women</div>
      <div>金钱:{money}</div>
      <button onClick = {()=>dispatch(buy(9999))}>买包1000</button>
      <button onClick = {()=>dispatch(buyAsync(300))}>做头发300</button>
    </div>
  )
}
