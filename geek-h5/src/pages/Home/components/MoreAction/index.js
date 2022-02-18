import Icon from '@/components/Icon'
import { setMoreAction } from '@/store/actions'
import { Modal } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

// feedbackType: normal / junk
const MoreAction = () => {
  const dispatch = useDispatch()
  const { visible } = useSelector(state => state.home.moreAction)
  // junk / normal
  const [feedbackType, setFeedbackType] = useState('normal')

  const onClose = () => {
    dispatch(
      setMoreAction({
        id: 0,
        visible: false
      })
    )
  }

  return (
    <div className={styles.root}>
      <Modal
        title=""
        footer={[]}
        transparent
        maskClosable
        visible={visible}
        onClose={onClose}
        className="more-action-modal"
      >
        <div className="more-action">
          {feedbackType === 'normal' ? (
            <>
              <div className="action-item">
                <Icon type="iconicon_unenjoy1" />
                不感兴趣
              </div>
              <div
                className="action-item"
                onClick={() => setFeedbackType('junk')}
              >
                <Icon type="iconicon_feedback1" />
                <span className="text">反馈垃圾内容</span>
                <Icon type="iconbtn_right" />
              </div>
              <div className="action-item">
                <Icon type="iconicon_blacklist" />
                拉黑作者
              </div>
            </>
          ) : (
            <>
              <div
                className="action-item"
                onClick={() => setFeedbackType('normal')}
              >
                <Icon type="iconfanhui" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              <div className="action-item">旧闻重复</div>
              <div className="action-item">广告软文</div>
              <div className="action-item">内容不实</div>
              <div className="action-item">涉嫌违法</div>
              <div className="action-item">
                <span className="text">其他问题</span>
                <Icon type="iconbtn_right" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default MoreAction
