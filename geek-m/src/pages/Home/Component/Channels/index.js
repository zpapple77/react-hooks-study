import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
// import { differenceBy } from 'lodash'
import differenceBy from 'lodash/differenceBy'

const Channels = ({ onClose }) => {
  const userChannels = useSelector((state) => state.home.userChannels)
  //推荐频道
  const recommendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.home
    //如果这个频道在userChannels中，就不要
    return differenceBy(allChannels,userChannels,'id')
  })
  console.log(recommendChannels, '111111')
  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className="isEdit">
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击删除频道 </span>
            <span className="channel-item-edit">保存</span>
          </div>
        </div>
        <div className="channel-list">
          {userChannels.map((item) => (
            <span className="channel-list-item" key={item.id}>
              {item.name}
              {/* <Icon type="iconbtn_tag_close"></Icon> */}
            </span>
          ))}
        </div>
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
            {/* <span className="channel-item-edit">编辑</span> */}
          </div>
          <div className="channel-list">
            {recommendChannels.map((item) => (
              <span className="channel-list-item" key={item.id}>
                +{item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
