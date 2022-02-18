import Icon from '@/components/Icon'
import Tabs from '@/components/Tabs'
import { getUser, getUserChannel } from '@/store/actions'
import { isAuth } from '@/utils'
import { Drawer } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleList from './components/ArticleList'
import Channels from './components/Channels'
import MoreAction from './components/MoreAction'
import styles from './index.module.scss'

const CHANNEL_KEY = 'itcast_channel_k'

const Home = ({ history }) => {
  const dispatch = useDispatch()
  const tabs = useSelector(state => state.home.userChannel)
  const [tabActiveIndex, setTabActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)

  // 获取 tabs 数据
  useEffect(() => {
    const loadData = async () => {
      const isLogin = isAuth()

      // 未登录
      if (!isLogin) {
        const localTabs = JSON.parse(localStorage.getItem(CHANNEL_KEY)) || []
        // 本地缓存中有 tabs 数据
        if (localTabs.length > 0) {
          dispatch(getUser(localTabs))
          return
        }
      }

      // 1 已登录
      // 2 未登录，本地缓存中也没有
      dispatch(getUserChannel())
    }

    loadData()
  }, [dispatch])

  useEffect(() => {
    if (tabs.length === 0) return

    localStorage.setItem(CHANNEL_KEY, JSON.stringify(tabs))
  }, [tabs])

  // 关闭 channels
  const onClose = () => setOpen(false)

  // 修改 tabs
  const onChangeTab = value => dispatch(getUser(value))

  return (
    <div className={styles.root}>
      <Tabs
        index={tabActiveIndex}
        tabs={tabs}
        onChange={index => setTabActiveIndex(index)}
      >
        {tabs.map(item => (
          <ArticleList key={item.id} channelId={item.id} />
        ))}
      </Tabs>

      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)} />
      </div>

      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={
          tabs.length > 0 ? (
            <Channels
              tabActiveIndex={tabActiveIndex}
              userChannles={tabs}
              onClose={onClose}
              onChange={onChangeTab}
              onChannelClick={index => setTabActiveIndex(index)}
            />
          ) : (
            ''
          )
        }
        open={open}
        onOpenChange={() => setOpen(false)}
      >
        {''}
      </Drawer>

      {/* more action */}
      <MoreAction />
    </div>
  )
}

/*
<div className="articles">
              <div className="article-item">
                <div className="article-content">
                  <h3>ES6时代，你真的会克隆对象吗？</h3>
                  <div className="article-img-wrapper">
                    <img
                      src="http://geek.itheima.net/resources/images/8.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="article-info">
                  <span>黑马先锋</span>
                  <span>0评论</span>
                  <span>2 年内</span>
                </div>
              </div>

              <div className="article-item">
                <div className="article-content none-mt">
                  <h3>ES6时代，你真的会克隆对象吗？</h3>
                </div>
                <div className="article-info none-mt">
                  <span>黑马先锋</span>
                  <span>0评论</span>
                  <span>2 年内</span>
                </div>
              </div>

              <div className="article-item">
                <div className="article-content t3">
                  <h3>ES6时代，你真的会克隆对象吗？</h3>
                  <div className="article-imgs">
                    <div className="article-img-wrapper">
                      <img
                        src="http://geek.itheima.net/resources/images/8.jpg"
                        alt=""
                      />
                    </div>
                    <div className="article-img-wrapper">
                      <img
                        src="http://geek.itheima.net/resources/images/8.jpg"
                        alt=""
                      />
                    </div>
                    <div className="article-img-wrapper">
                      <img
                        src="http://geek.itheima.net/resources/images/8.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="article-info">
                  <span>黑马先锋</span>
                  <span>0评论</span>
                  <span>2 年内</span>
                </div>
              </div>
            </div>
*/

// const Home = () => {
//   // { id, name }
//   const [tabs, setTabs] = useState([])

//   useEffect(() => {
//     const loadTabsData = async () => {
//       const res = await http.get('/channels')
//       console.log(res)

//       const { channels } = res.data.data
//       const newTabs = channels.map(item => ({ title: item.name }))
//       setTabs(newTabs)
//     }

//     loadTabsData()
//   }, [])

//   const renderContent = () => {
//     return <div>1</div>
//   }

//   return (
//     <div className={styles.root}>
//       <Tabs
//         tabs={tabs}
//         // animated={false}
//         tabBarActiveTextColor="#333"
//         tabBarInactiveTextColor="#9EA1AE"
//         tabBarUnderlineStyle={{
//           width: 30,
//           marginLeft: 13.9,
//           borderColor: '#fc6627'
//         }}
//         renderTab={tab => {
//           return <span>{tab.title}</span>
//         }}
//       >
//         {renderContent}
//       </Tabs>
//       <div className="tabs-opration">
//         <svg className="icon" aria-hidden="true">
//           <use xlinkHref="#iconbtn_search"></use>
//         </svg>
//         <svg className="icon" aria-hidden="true">
//           <use xlinkHref="#iconbtn_channel"></use>
//         </svg>
//       </div>
//     </div>
//   )
// }

export default Home
