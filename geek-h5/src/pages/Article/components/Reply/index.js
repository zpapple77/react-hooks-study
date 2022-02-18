import NavBar from '@/components/NavBar'
import NoneComment from '@/components/NoneComment'
import { http } from '@/utils'
import { Drawer } from 'antd-mobile'
import { useEffect, useState } from 'react'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'

const Reply = ({ data, art_id, onClose }) => {
  const { com_id, aut_name } = data

  const [comment, setComment] = useState({})
  const [commentOpen, setCommentOpen] = useState({
    visible: false,
    id: com_id
  })

  useEffect(() => {
    const loadData = async () => {
      const res = await http.get('/comments', {
        params: {
          type: 'c',
          source: com_id
        }
      })
      setComment(res.data.data)
    }

    if (com_id) {
      loadData()
    }
  }, [com_id])

  // 展示评论窗口
  const onComment = () => {
    setCommentOpen({
      visible: true,
      id: com_id
    })
  }

  // 关闭评论窗口
  const onCloseComment = () => {
    setCommentOpen({
      visible: false,
      id: 0
    })
  }

  // 发表评论后，插入到数据中
  const onInsertComment = data => {
    setComment({
      ...comment,
      total_count: comment.total_count + 1,
      results: [data, ...comment.results]
    })
  }

  const { total_count, results } = comment

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          {total_count}条回复
        </NavBar>

        <div className="origin-comment">
          <CommentItem type="origin" {...data} />
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {results?.length > 0 ? (
            results.map(item => <CommentItem key={item.com_id} {...item} />)
          ) : (
            <NoneComment />
          )}
        </div>

        <CommentFooter
          placeholder="去评论"
          type="reply"
          onComment={onComment}
        />
      </div>
      <Drawer
        className="drawer"
        position="bottom"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={
          <div className="drawer-sidebar-wrapper">
            {commentOpen.visible && (
              <CommentInput
                id={commentOpen.id}
                art_id={art_id}
                name={aut_name}
                onClose={onCloseComment}
                onComment={onInsertComment}
              />
            )}
          </div>
        }
        open={commentOpen.visible}
        onOpenChange={onCloseComment}
      >
        {''}
      </Drawer>
    </div>
  )
}

export default Reply
