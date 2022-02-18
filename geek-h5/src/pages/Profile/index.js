import Icon from '@/components/Icon'
import { getProfile } from '@/store/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styles from './index.module.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.user)
  const history = useHistory()

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const { art_count, fans_count, follow_count, like_count, name, photo } =
    profile

  return (
    <div className={styles.root}>
      <div className="profile">
        <div className="user-info">
          <div className="avatar">
            <img src={photo} alt="" />
          </div>
          <div className="user-name">{name}</div>
          <Link to="/profile/edit">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读
          <span>10</span>
          分钟
        </div>

        <div className="count-list">
          <div className="count-item">
            <p>{art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div
            className="service-item"
            onClick={() => history.push('/profile/feedback')}
          >
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div
            className="service-item"
            onClick={() => history.push('/profile/chat')}
          >
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
