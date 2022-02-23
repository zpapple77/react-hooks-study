import Icon from '@/components/Icon'
import React from 'react'
import styles from './index.module.scss'
export default function Home() {
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content"></div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        <div className="tabbar-item tabbar-item-active">
          <Icon type="iconbtn_home_sel" />
          <span>首页</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_qa" />
          <span>问答</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_video" />
          <span>视频</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_mine" />
          <span>我的</span>
        </div>
      </div>
    </div>
  )
}