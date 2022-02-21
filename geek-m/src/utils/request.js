import axios from 'axios'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0/socket.io/',
})

//配置请求拦截器
instance.interceptors.request.use(config=>{
    //对config做点什么
    return config
},error=>{
    //对错误做点什么
    return Promise.reject(error)
})
//配置响应拦截器
instance.interceptors.response.use(response=>{
    //对响应做点什么
    return response.data
},(error)=>{
    //对错误做点什么
    return Promise.reject(error)
})


export default instance
