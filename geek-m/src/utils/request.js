import { Toast } from 'antd-mobile'
import axios from 'axios'

// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config) => {
  return config
})

http.interceptors.response.use(
  (response) => {
    //对响应做点什么
    return response.data
  },
  (err) => {
    if (err.response) {
      Toast.info(err.response.data.message)
    } else { 
      Toast.info('网络繁忙,稍后再试')
    }
    return Promise.reject(err)
  }
)

// 3. 导出该 axios 实例
export default http
