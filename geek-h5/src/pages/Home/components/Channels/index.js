import Icon from '@/components/Icon'
import { addChannel, deleteChannel, getRecommendChannel } from '@/store/actions'
import { isAuth } from '@/utils'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

const Channels = ({
  userChannles = [],
  tabActiveIndex,
  onClose,
  onChange,
  onChannelClick
}) => {
  const dispatch = useDispatch()
  const channelsList = useSelector(state => state.home.recommendChannel)
  const [isEdit, setIsEdit] = useState(false)

  const isLogin = isAuth()

  useEffect(() => {
    if (channelsList.length === 0) {
      dispatch(getRecommendChannel(userChannles))
    }
  }, [dispatch, userChannles, channelsList.length])

  const onEdit = () => setIsEdit(!isEdit)

  const onDeleteChannel = async data => {
    const newTabs = userChannles.filter(item => item.id !== data.id)
    onChange(newTabs)

    // 删除频道
    dispatch(deleteChannel(data, isLogin))
  }

  const onAddChannel = async data => {
    const newTabs = [...userChannles, data]
    onChange(newTabs)

    // 添加频道
    dispatch(addChannel(data, isLogin))
  }

  // 点击切换频道
  const onChannelItemClick = index => {
    setIsEdit(false)
    onClose()
    onChannelClick(index)
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        <div className={classnames('channel-item', isEdit ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              点击{isEdit ? '删除' : '进入'}频道
            </span>
            <span className="channel-item-edit" onClick={onEdit}>
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {userChannles.map((item, index) => (
              <span
                key={item.id}
                className={classnames(
                  'channel-list-item',
                  index === tabActiveIndex ? 'selected' : ''
                )}
                onClick={() => onChannelItemClick(index)}
              >
                {item.title}
                <Icon
                  type="iconbtn_tag_close"
                  onClick={e => {
                    e.stopPropagation()

                    onDeleteChannel(item)
                  }}
                />
              </span>
            ))}

            {/* <span className="channel-list-item">开发者资讯</span> */}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
            {/* <span className="channel-item-edit">编辑</span> */}
          </div>
          <div className="channel-list">
            {channelsList.map(item => (
              <span
                key={item.id}
                className="channel-list-item"
                onClick={() => onAddChannel(item)}
              >
                + {item.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
