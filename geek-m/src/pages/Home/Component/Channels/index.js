import React, { useState } from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
// import { differenceBy } from 'lodash'
import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { addChannel, delChannel } from '@/store/actions/home'
import { Toast } from 'antd-mobile'

const Channels = ({ onClose, index, onChange }) => {
  const userChannels = useSelector((state) => state.home.userChannels)
  const dispatch = useDispatch()
  //推荐频道
  const recommendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.home
    //如果这个频道在userChannels中，就不要
    return differenceBy(allChannels, userChannels, 'id')
  })
  const changeChannel = (i) => {
    //如果是编辑状态，不允许跳转
    if (editing) return
    onChange(i)
    onClose()
  }

  //处理编辑状态
  const [editing, setEditing] = useState(false)

  //删除频道
  const del = (channel, i) => {
    // console.log(channel)
    //在actions中考虑登入了还是没登入？
    if (userChannels.length <= 4) {
      Toast.info('至少保留四个频道')
      return
    }

    dispatch(delChannel(channel))

    //高亮处理
    if(i===index){
      onChange(0)
    }
    if(i<index){
      onChange(index-1)
    }
  }

  const add = async (channel)=>{
    // console.log(channel);
    await dispatch(addChannel(channel))
    Toast.success('添加成功',1)

  }
  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', { edit: editing })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {editing ? '点击删除频道' : '点击进入频道'}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setEditing(!editing)
              }}
            >
              {editing ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {userChannels.map((item, i) => (
              <span
                className={classNames('channel-list-item', {
                  selected: index === i,
                })}
                key={item.id}
                onClick={() => changeChannel(i)}
              >
                {item.name}
                {item.id !== 0 && (
                  <Icon
                    type="iconbtn_tag_close"
                    onClick={() => del(item, i)}
                  ></Icon>
                )}{' '}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannels.map((item) => (
              <span className="channel-list-item" key={item.id} onClick={()=>add(item)}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
