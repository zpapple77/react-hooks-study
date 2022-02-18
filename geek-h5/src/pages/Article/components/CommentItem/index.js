import Icon from '@/components/Icon'
import classnames from 'classnames'
import dayjs from 'dayjs'
import styles from './index.module.scss'

const CommentItem = ({
  com_id,
  aut_photo,
  aut_name,
  like_count,
  is_followed,
  is_liking,
  content,
  reply_count,
  pubdate,
  onThumbsUp,
  onOpenReply = () => {},
  // normal 普通
  // origin 回复评论的原始评论
  // reply 回复评论
  type = 'normal'
}) => {
  // 关注 or 点赞
  const thumbsUp =
    type === 'normal' ? (
      <span className="thumbs-up" onClick={onThumbsUp}>
        {like_count}
        <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
      </span>
    ) : (
      <span className={classnames('follow', is_followed ? 'followed' : '')}>
        {is_followed ? '已关注' : '关注'}
      </span>
    )

  // 回复按钮
  const replyJSX =
    type === 'normal' ? (
      <span className="replay" onClick={() => onOpenReply(com_id)}>
        {reply_count === 0 ? '' : reply_count}回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src={aut_photo} alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">{aut_name}</span>
          {thumbsUp}
        </div>
        <div className="comment-content">{content}</div>
        <div className="comment-footer">
          {replyJSX}
          <span className="comment-time">{dayjs().from(pubdate)}</span>
          {/* 未提供举报评论接口 */}
          {/* <Icon className="close" type="iconbtn_essay_close" /> */}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
