import React from 'react'
import { useEffect,useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
export default function NotFound() {
  //   const [time, setTime] = useState(3)
  //   const history = useHistory()
  //   const timeRef = useRef(-1)
  //第一种写法
  //   useEffect(() => {
  //     let timer = setInterval(() => {
  //       setTime((time) => {
  //         timeRef.current = time - 1
  //         return time - 1
  //       })
  //       if (timeRef.current === 0) {
  //         clearInterval(timer)
  //         history.push('/home')
  //       }
  //     }, 1000)
  //   }, [history])

  //第二种写法
  const [time, setTime] = useState(3)
  const history = useHistory()
  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    if(time===0){
        clearTimeout(timer)
        history.push('/home')
    }
  }, [time,history])
  return (
    <div>
      <h1>对不起，你访问的内容不存在...</h1>
      <p>
        {time}秒后，返回<Link to="/home">首页</Link>
      </p>
    </div>
  )
}
