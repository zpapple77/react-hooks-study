import http from '@/utils/request'

/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendCode = (mobile) => {
  return async (dispatch) => {
    const res = await http.get(`/sms/codes/${mobile}`)
    console.log(res)
  }
}
