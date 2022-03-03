import http from '@/utils/request'
import { getLoacalChannels, hasToken, setLocalChannels } from '@/utils/storage'
import { SAVE_ALL_CHANNELS, SAVE_CHANNELS } from '../action_types/home'

/**
 * 获取用户的频道
 */
export const getUserChannels = () => {
  return async (dispatch) => {
    //判断用户是否登入
    if (hasToken) {
      //用户的自己的频道
      const res = await http.get('/user/channels')
      // console.log(res)
      dispatch(saveUserChannels(res.data.channels))
    } else {
      //2.没有token，从本地去获取频道数据
      const channels = getLoacalChannels()
      if (channels) {
        //没有token，但是有本地channels数据
        dispatch(saveUserChannels(channels))
      } else {
        //没有token，本地也没有channels数据
        const res = await http.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        //这里请求的是不带用户token的默认数据，并且要保存到本地
        setLocalChannels(res.data.channels)
      }
    }
  }
}

//保存用户频道到redux中
export const saveUserChannels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload,
  }
}

//获取所有频道  
export const getAllChannels = ()=>{
  return async dispatch=>{
    const res = await http.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}


//保存所有频道
export const saveAllChannels = (payload)=>{
  return {
    type:SAVE_ALL_CHANNELS,
    payload
  }
}