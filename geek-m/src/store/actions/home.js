import http from '@/utils/request'
import { getLoacalChannels, hasToken, setLocalChannels } from '@/utils/storage'
import {
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
  SAVE_CHANNELS,
  SAVE_MORE_ARTICLE_LIST,
} from '../action_types/home'

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
export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await http.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

//保存所有频道
export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  }
}

//删除频道
export const delChannel = (channel) => {
  //如果用户登入了，需要发送请求删除频道
  //如果用户没有登入，需要删除本地中的这个频道
  //不管登入没登入，都需要修改redux中的频道
  return async (dispatch, getState) => {
    //getState能干什么？
    // console.log(getState());
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      //发送请求
      await http.delete('/user/channels/' + channel.id)
      //同步频道的数据到redux中
      dispatch(
        saveUserChannels(userChannels.filter((item) => item.id !== channel.id))
      )
    } else {
      //没有登入
      //修改本地，修该redux
      const result = userChannels.filter((item) => item.id !== channel.id)
      dispatch(saveUserChannels(result)) //redux
      setLocalChannels(result) //本地
    }
  }
}

//添加频道
export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    // console.log(getState());
    const channels = [
      ...getState().home.userChannels, //原来的频道
      channel,
    ]

    //有token，发请求，往redux传一份
    if (hasToken()) {
      //登入了  发请求添加
      await http.patch('/user/channels', {
        channels: [channel],
      })
      dispatch(saveUserChannels(channels))
    } else {
      // 没有token 直接往redux存一份,往本地存一份
      dispatch(saveUserChannels(channels))
      setLocalChannels(channels)
    }
  }
}

//获取文章列表数据
export const getArticleList = (channelId, timestamp) => {
  return async (dispatch) => {
    const res = await http({
      method: 'get',
      url: '/articles',
      params: {
        timestamp: timestamp,
        channel_id: channelId,
      },
    })
    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
      })
    )
  }
}
export const getMoreArticleList = (channelId, timestamp) => {
  return async (dispatch) => {
    const res = await http({
      method: 'get',
      url: '/articles',
      params: {
        timestamp: timestamp,
        channel_id: channelId,
      },
    })
    dispatch(
      setMoreArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
      })
    )
  }
}
export const setArticleList = (payload) => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload,
  }
}
export const setMoreArticleList = (payload) => {
  return {
    type: SAVE_MORE_ARTICLE_LIST,
    payload,
  }
}
