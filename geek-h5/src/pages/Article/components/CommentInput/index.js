import NavBar from '@/components/NavBar'
import { http } from '@/utils'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

const CommentInput = ({ id, name, onClose, onComment, art_id }) => {
  const [value, setValue] = useState('')
  const txtRef = useRef(null)

  useEffect(() => {
    // 解决页面抖动的问题
    setTimeout(() => {
      txtRef.current.focus()
    }, 600)
  }, [])

  const onChange = e => {
    setValue(e.target.value)
  }

  const onSendComment = async () => {
    if (value.trim() === '') return

    const res = await http.post('/comments', {
      target: id,
      content: value,
      // 回复评论是需要此参数
      art_id
    })

    onComment(res.data.data.new_obj)
    onClose()
  }

  return (
    <div className={styles.root}>
      <NavBar
        onLeftClick={onClose}
        rightContent={
          <span className="publish" onClick={onSendComment}>
            发表
          </span>
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {name && <div className="at">@{name}:</div>}
        <textarea
          ref={txtRef}
          placeholder="说点什么~"
          rows="10"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default CommentInput
