//提供todos相关的action
import axios from 'axios'
//获取任务列表
export const getListAsync = () => {
  return async (dispatch) => {
    //发送请求
    const res = await axios.get('http://localhost:8888/todos')
    console.log(res.data);
    dispatch({
      type:'GET_LIST',
      payload:res.data 
    })
  }
}

//添加任务
export const addTodo = name=>{
  return async dispatch=>{
    const res = await axios.post('http://localhost:8888/todos',{
      name,
      done:false
    })
    // dispatch(getListAsync())第一种做法
    dispatch({
      type:'ADD_TODO',
      payload:res.data
    })
  }
}

export const delTodo = (id) => {
  return async dispatch=>{
    //处理异步
    await axios.delete(`http://localhost:8888/todos/${id}`)
    dispatch({
      type:'DEL_TODO',
      payload:id
    })
  }
}

export const changeDone = (id,done)=>{
  return async dispatch=>{
    //发送请求
    await axios.patch(`http://localhost:8888/todos/${id}`,{done})
    dispatch({
      type:'CHANGE_DONE',
      payload:{
        id,
        done
      }
    })
  }
}

export const changeName = (id,name)=>{
  return async dispatch=>{
    //发送请求
    await axios.patch(`http://localhost:8888/todos/${id}`,{name})
    dispatch({
      type:'CHANGE_NAME',
      payload:{
        id,
        name
      }
    })
  }
}

