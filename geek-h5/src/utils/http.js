import axios from 'axios'
import { history } from './history'
import { getTokens, removeTokens, setTokens } from './token'

const http = axios.create({
  // baseURL: 'http://geek.itheima.net/v1_0'
  baseURL: 'http://toutiao.itheima.net/v1_0'
})

http.interceptors.request.use(config => {
  // if (config.method === 'post') {
  //   config.headers['Content-Type'] = 'application/json'
  // }
  config.headers['Authorization'] = `Bearer ${getTokens().token}`
  return config
})

http.interceptors.response.use(response => {
  // try {
  //   return response.data
  // } catch {
  //   return response
  // }
  return response
}, async error => {
  console.log('error', error.response)

  if (error.response.status === 401) {
    const { token, refresh_token } = getTokens()

    if (!token || !refresh_token) {
      history.replace('/login', {
        from: history.location.pathname || '/home'
      })
      return Promise.reject(error)
    }

    try {
      // 自动刷新 token
      const res = await http.put('/authorizations', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${refresh_token}`
        }
      })

      setTokens({
        refresh_token,
        token: res.data.data.token
      })

      // 继续发送刚才错误的请求
      return http(error.config)
    } catch (error) {
      // 失败，说明 refresh_token 失效了
      console.log(error.response)
      console.log(history.location.pathname)

      removeTokens()
      history.push('/login', {
        from: history.location.pathname || '/home'
      })
      return Promise.reject(error)
    }
  }

  return Promise.reject(error)
})

export { http }
