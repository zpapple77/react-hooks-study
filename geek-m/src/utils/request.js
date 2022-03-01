import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getTokenInfo, setTokenInfo } from './storage'
import {removeTokenInfo} from '@/utils/storage'
import history from './history'
import store from '@/store'
import { saveToken,logout } from '@/store/actions/login'
const baseURL = 'http://geek.itheima.net/v1_0'
// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL,
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config) => {
  // 获取缓存中的 Token 信息
  //在发送请求时在请求头中携带上 Token 信息，
  // 以便在请求需要鉴权的后端接口时可以顺利调用
  const token = getTokenInfo().token
  if (token) {
    // 设置请求头的 Authorization 字段
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    //对响应做点什么
    return response.data
  },
  async (err) => {
    //如果因为网络原因，response没有，给提示消息
    if (!err.response) {
      Toast.info('网络繁忙,稍后再试')
      return Promise.reject(err)
    }
    const { response, config } = err
    //网络没问题，后台返回了有数据
    if (response.status !== 401) {
      //不是token失效的问题
      Toast.info(response.data.message)
      return Promise.reject(err)
    }

    //网络没问题，而且是401token 失效的问题
    //1.判断有没有refresh_token
    const { token, refresh_token } = getTokenInfo()

    // 如果是没有 Token 或 Refresh Token
    if (!token || !refresh_token) {
      // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
      history.replace('/login', {
        from: history.location.pathname || '/home',
      })
      return Promise.reject(err)
    }

    //是401错误，且有refresh_token， 刷新token
    // 特别说明：这个地方发请求的时候，不能使用新建的 http 实例去请求，要用默认实例 axios 去请求！
    // 否则会因 http 实例的请求拦截器的作用，携带上老的 token 而不是 refresh_token
    try {
      const res = await axios.put(`${config.baseURL}/authorizations`, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${refresh_token}`,
        },
      })
      console.log(res)
      //刷新成功
      // 将新换到的 Token 信息保存到 Redux 和 LocalStorage 中
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token,
      }
      //保存到localStorage中
      setTokenInfo(tokenInfo)
      //保存到redux中
      store.dispatch(saveToken(tokenInfo))

      //token刷新成功后，重新把最开始失败的请求重新发一次
      return http(config)
    } catch (err) {
      // 清除 Redux 和 LocalStorage 中 Token 信息
      removeTokenInfo()
      store.dispatch(logout())

      // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
      history.push('/login', {
        from: history.location.pathname || '/home',
      })

      Toast.info('登入信息失效，请重新登入')
      return Promise.reject(err)
    }
  }
)

// 3. 导出该 axios 实例
export default http
