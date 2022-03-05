import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels } from '@/store/actions/home'
import Icon from '@/components/Icon'
import { Drawer } from 'antd-mobile'
import Channels from './Component/Channels'
import ArticleList from './Component/ArticleList'
import MoreAction from './Component/MoreAction'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])

  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

  const tabs = useSelector((state) => state.home.userChannels)

  //控制高亮
  const [active, setActive] = useState(0)

  return (
    <div className={styles.root}>
      {/* 
      根据用户是否登入，以及本地缓存是否有频道数据，来优化频道数据的存取逻辑
      1. 如果用户登入了，发送请求获取该用户的频道信息
      2.如果用户没有登入
        2.1从本地的localstorage中获取频道数据，如果本地存储了频道数据，那就直接渲染
        2.2本地也没有存储数据，发送请求获取默认的频道数据，而且把数据存到本地，渲染 */}
      <Tabs
        tabs={tabs}
        index={active}
        onChange={(e) => {
          setActive(e)
        }}
      >
        {/* 放对应数量的ArticleList */}
        {tabs.map((item) => (
          <ArticleList
            key={item.id}
            channelId={item.id}
            activeId={tabs[active].id}
          />
        ))}
      </Tabs>
      {/* 频道Tab栏右侧两个图标按钮：搜索，频道管理 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)} />
      </div>

      {/* 频道管理组件 */}
      <Drawer
        className="my-drawer"
        position="left"
        children={''}
        sidebar={
          open && (
            <Channels
              onClose={onClose}
              index={active}
              onChange={(e) => setActive(e)}
            ></Channels>
          )
        }
        open={open}
      ></Drawer>
      <MoreAction></MoreAction>
    </div>
  )
}
