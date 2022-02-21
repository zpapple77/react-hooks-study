import axios from 'axios'

// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0'
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use(config => {
  return config
})

http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

// 3. 导出该 axios 实例
export default http