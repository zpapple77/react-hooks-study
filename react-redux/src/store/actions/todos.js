//提供todos相关的action
import axios from 'axios'
//获取任务列表
export const getList = (list) => {
  return {
    type: 'GET_LIST',
    list
  }
}

//获取任务列表  异步
export const getListAsync = () => {
  return async (dispatch) => {
    //发送请求
    const res = await axios.get('http://localhost:8888/todos')
    console.log(res.data);
    dispatch(getList(res.data))
  }
}
