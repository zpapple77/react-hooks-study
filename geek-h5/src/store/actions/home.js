import { http } from '@/utils'
import differenceBy from 'lodash/differenceBy'

const getUser = channels => ({ type: 'home/channel', payload: channels })
const getRecommend = channels => ({ type: 'home/recommend', payload: channels })

/**
 * 获取频道
 * @returns thunk
 */
const getUserChannel = () => {
  return async dispatch => {
    try {
      const res = await http.get('/user/channels')
      const { channels } = res.data.data
      const newChannels = channels.map(item => ({
        id: item.id,
        title: item.name
      }))
      dispatch(getUser(newChannels))
    } catch {}
  }
}

/**
 * 获取所有频道中排除用户自己的频道数据
 * @param {Array} userChannles 用户自己的频道数组
 * @returns thunk
 */
const getRecommendChannel = userChannles => {
  return async dispatch => {
    try {
      const res = await http.get('/channels')
      let { channels } = res.data.data

      channels = channels.map(item => ({ id: item.id, title: item.name }))

      // 去掉 我的频道 中已有项
      const newChannels = differenceBy(channels, userChannles, 'id')
      dispatch(getRecommend(newChannels))
    } catch {}
  }
}

/**
 * 删除频道
 * @param {Object} deleteChannel 要删除的频道数据
 * @param {boolean} isLogin 是否登录
 * @returns thunk
 */
const deleteChannel = (deleteChannel, isLogin) => {
  return async (dispatch, getState) => {
    if (isLogin) {
      try {
        await http.delete(`/user/channels/${deleteChannel.id}`)
      } catch {}
    }

    const { home } = getState()
    const channelsList = home.recommendChannel

    const newChannels = [...channelsList, deleteChannel].sort((a, b) => {
      return a.id - b.id
    })
    dispatch(getRecommend(newChannels))
  }
}

/**
 * 添加频道
 * @param {Object} addChannel 要添加的频道数据
 * @param {boolean} isLogin 是否登录
 * @returns thunk
 */
const addChannel = (addChannel, isLogin) => {
  return async (dispatch, getState) => {
    if (isLogin) {
      try {
        await http.patch('/user/channels', {
          channels: addChannel
        })
      } catch {}
    }

    const { home } = getState()
    const channelsList = home.recommendChannel

    const newChannels = channelsList.filter(item => item.id !== addChannel.id)
    dispatch(getRecommend(newChannels))
  }
}

const setMoreAction = ({ id, visible }) => ({
  type: 'home/more_action',
  payload: { id, visible }
})

export {
  getUserChannel,
  getUser,
  getRecommendChannel,
  deleteChannel,
  addChannel,
  setMoreAction
}
