import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { getTokens } from '@/utils'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import styles from './index.module.scss'

const Chat = () => {
  const history = useHistory()
  const profile = useSelector(state => state.profile.user)
  const [value, setValue] = useState([])
  const [list, setList] = useState([
    { name: 'xz', msg: '亲爱的用户您好，小智同学为您服务。' },
    { name: 'self', msg: '你好' }
  ])
  const socketIO = useRef(null)
  const chatListRef = useRef(null)

  useEffect(() => {
    // 1. 建立连接
    const socketio = io('http://toutiao.itheima.net', {
      query: {
        token: getTokens().token
      },
      transports: ['websocket']
    })
    socketio.on('connect', () => {
      // 2. 连接成功
      // 让小智给你打个招呼
      setList(list => [...list, { name: 'xz', msg: '您想知道点啥？' }])
    })
    // 4. 收消息
    socketio.on('message', data => {
      // 聊天记录
      setList(list => [...list, { name: 'xz', msg: data.msg }])
    })

    socketIO.current = socketio

    return () => socketio.close()
  }, [])

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight
  }, [list])

  const onSend = e => {
    if (!value) return
    if (e.keyCode === 13) {
      // 3. 发信息
      socketIO.current.emit('message', { msg: value, timestamp: Date.now() })
      // 聊天记录
      setList([...list, { name: 'self', msg: value }])
      setValue('')
    }
  }

  return (
    <div className={styles.root}>
      <NavBar className="fixed-header" onLeftClick={() => history.go(-1)}>
        小智同学
      </NavBar>

      <div className="chat-list" ref={chatListRef}>
        {list.map((item, index) => (
          <div
            className={classnames(
              'chat-item',
              item.name === 'self' ? 'user' : ''
            )}
            key={index}
          >
            {item.name === 'self' ? (
              <img
                src={
                  profile.photo ||
                  'http://toutiao.itheima.net/images/user_head.jpg'
                }
                alt=""
              />
            ) : (
              <Icon type="iconbtn_xiaozhitongxue" />
            )}
            <div className="message">{item.msg}</div>
          </div>
        ))}
      </div>

      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          onKeyDown={onSend}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
