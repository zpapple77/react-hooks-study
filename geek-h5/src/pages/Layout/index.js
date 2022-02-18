import { AuthRoute } from '@/components/AuthRoute'
import Icon from '@/components/Icon'
import { KeepAlive } from '@/components/KeepAlive'
import classnames from 'classnames'
import { Route, useHistory, useLocation } from 'react-router-dom'
import Home from '../Home'
import Profile from '../Profile'
import Question from '../Question'
import Video from '../Video'
import styles from './index.module.scss'

const menus = [
  { id: 1, title: '首页', to: '/home/index', icon: 'iconbtn_home' },
  { id: 2, title: '问答', to: '/home/question', icon: 'iconbtn_qa' },
  { id: 3, title: '视频', to: '/home/video', icon: 'iconbtn_video' },
  { id: 4, title: '我的', to: '/home/profile', icon: 'iconbtn_mine' }
]

const Layout = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  return (
    <div className={styles.root}>
      <KeepAlive alivePath="/home/index" exact path="/home/index" component={Home} />
      <Route path="/home/question" component={Question} />
      <Route path="/home/video" component={Video} />
      <AuthRoute path="/home/profile" component={Profile} />

      <div className="tabbar">
        {menus.map(item => {
          const isSelected = item.to === pathname

          return (
            <div
              key={item.id}
              className={classnames(
                'tabbar-item',
                isSelected ? 'tabbar-item-active' : ''
              )}
              onClick={() => history.push(item.to)}
            >
              <Icon type={`${isSelected ? `${item.icon}_sel` : item.icon}`} />
              <span>{item.title}</span>
            </div>
          )
        })}

        {/* <div className="tabbar-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_qa"></use>
          </svg>
          <span>回答</span>
        </div>
        <div className="tabbar-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_video"></use>
          </svg>
          <span>视频</span>
        </div>
        <div className="tabbar-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_mine"></use>
          </svg>
          <span>我的</span>
        </div> */}
      </div>
    </div>
  )
}

export default Layout
