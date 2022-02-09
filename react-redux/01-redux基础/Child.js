import {useStore,useSelector,useDispatch} from 'react-redux'
import {add} from './store/action'
export function Child(){
    //调用useStore方法就能得到store对象
    //调用useSelector方法就能得到store中的数据
    // const store = useStore()
    const count= useSelector((state)=>state)
    const dispatch = useDispatch()
    //括号第一个state是redux里面的数据
    return <div>
        {/* <h3>我是子组件---点击了{store.getState()}次</h3> */}
        <h3>我是子组件---点击了{count}次</h3>
        <button onClick={()=>dispatch(add())}>修改</button>
        {/* <button onClick={()=>store.dispatch(add())}>修改</button> */}
    </div>
}