import { http, removeTokens, setTokens } from '@/utils'

const saveToken = tokens => ({ type: 'login/token', payload: tokens })

/**
 * 发送验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
const sendSms = mobile => {
  return () => {
    http.get(`/sms/codes/${mobile}`)
  }
}

/**
 * 登录
 * @param {{ mobile, code }} values 登录信息
 * @returns thunk
 */
const login = values => {
  return async dispatch => {
    const res = await http.post('/authorizations', values)
    // 保存到 redux 中
    dispatch(saveToken(res.data.data))
    // 保存到本地缓存中
    setTokens(res.data.data)
  }
}

const logout = () => {
  return () => {
    removeTokens()
  }
}

export { saveToken }
export { sendSms, login, logout }

