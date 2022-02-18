import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const NotFound = () => {
  const [leftSecond, setLeftSecond] = useState(3)
  const timerRef = useRef(-1)
  const history = useHistory()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (leftSecond <= 1) {
        return history.push('/home')
      }
      setLeftSecond(leftSecond - 1)
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [leftSecond, history])

  return (
    <div>
      <h1>对不起，你访问的内容不存在...</h1>
      <p>
        {leftSecond} 秒后，返回<Link to="/home">首页</Link>
      </p>
    </div>
  )
}

export default NotFound
