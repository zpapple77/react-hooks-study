import request from '@/utils/request'
import { removeTokenInfo, setTokenInfo } from '@/utils/storage'

/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendCode = (mobile) => {
  return async (dispatch) => {
    const res = await request.get(`/sms/codes/${mobile}`)
    console.log(res)
  }
}

export const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload,
  }
}

/**
 * 登入功能
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      method: 'post',
      url: '/authorizations',
      data,
    })
    //保存token到redux中
    dispatch(saveToken(res.data))
    //保存到本地
    setTokenInfo(res.data)
  }
}

/**
 * 退出
 * @returns
 */
export const logout = () => {
  return (dispatch) => {
    //移除本地token
    removeTokenInfo()
    //移除redux中的token
    dispatch({
      type: 'login/logout',
    })
  }
}
