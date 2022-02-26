import http from "@/utils/request"
import { SAVE_PROFILE, SAVE_USER } from "../action_types/profile"

/**
 * 
 * @returns 保存用户信息
 */
export const saveUser = (payload)=>{
    return {
        type:SAVE_USER,
        payload
    }
}

/**
 * 获取用户基本信息
 * @returns thunk
 */
export const getUser = () => {
  return async dispatch => {
    const res = await http.get('/user')
    // console.log(res);
    dispatch(saveUser(res.data))
  }
}


export const saveProfile = (payload) =>{
  return {
    type:SAVE_PROFILE,
    payload
  }
}
/**
 * 获取用户基本信息
 * @returns thunk
 */
 export const getProfile = () => {
  return async dispatch => {
    const res = await http.get('/user/profile')
    // console.log(res);
    dispatch(saveProfile(res.data))
  }
}

//修改用户信息
export const updateProfile = (data)=>{
  return async dispatch=>{
    const res = await http.patch('/user/profile',data)
    console.log(res);
    //更新（修改成功之后）直接重新获取用户基本信息
    dispatch(getProfile())
  }
}