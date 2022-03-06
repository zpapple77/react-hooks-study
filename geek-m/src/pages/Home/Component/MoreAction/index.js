import Icon from '@/components/Icon'
import { setMoreAction, unLikeArticle ,reportArticle} from '@/store/actions/home'
// import { setMoreAction } from '@/store/actions'
import { Modal, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

/*
 1.在redux中，需要新增一个数据
  moreAction：{visible：false，article：' ',auth_id:''}
 
 2.在action中新增一个action
 export const setMoreAction = (payload) => ({
  type: 'home/setMoreAction',
  payload,
  })

  3.reducer处理这个action
  case 'home/setMoreAction':{
      return {
        ...state,
        moreAction:payload
      }
  }

  4. articleItem组件中，点击举报按钮，需要显示弹窗
  onClick={() =>
    dispatch(
      setMoreAction({
        visible: true,
        articleId: article.art_id,
      })
    )
  }

  5.在moreAction中，点击遮罩，onClose时间...关闭弹窗
 const onClose = () => {
    dispatch(
      setMoreAction({
        articleId: '',
        visible: false,
      })
    )
  }
 */

/**
 *
 * @returns 举报反馈菜单
 */
const list = [
  { id: 0, title: '其他问题' },
  { id: 1, title: '标题夸张' },
  { id: 2, title: '低俗色情' },
  { id: 3, title: '错别字多' },
  { id: 4, title: '旧闻重复' },
  { id: 5, title: '广告软文' },
  { id: 6, title: '内容不实' },
  { id: 7, title: '涉嫌违法犯罪' },
  { id: 8, title: '侵权' },
]

const MoreAction = () => {
  const dispatch = useDispatch()
  const moreAction = useSelector((state) => state.home.moreAction)
  const [type, setType] = useState('normal')

  //关闭弹窗
  const onClose = () => {
    setType('normal')
    dispatch(
      setMoreAction({
        articleId: '',
        visible: false,
      })
    )
  }

  const unlike = async () => {
    await dispatch(unLikeArticle(moreAction.articleId))
    onClose()
    Toast.info('已收到您的反馈', 1)
  }

  const report = async(id)=>{
    await dispatch(reportArticle(moreAction.articleId,id))
    onClose()
    Toast.info('举报成功', 1)
  }
  return (
    <div className={styles.root}>
      <Modal
        title=""
        footer={[]}
        transparent
        maskClosable
        visible={moreAction.visible}
        onClose={onClose}
        className="more-action-modal"
      >
        <div className="more-action">
          {type === 'normal' ? (
            <>
              <div className="action-item" onClick={unlike}>
                <Icon type="iconicon_unenjoy1" />
                不感兴趣
              </div>
              <div className="action-item" onClick={() => setType('junk')}>
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
              <div className="action-item" onClick={() => setType('normal')}>
                <Icon type="iconfanhui" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              {list.map((item) => (
                <div key={item.id} className="action-item" onClick={()=>report(item.id)}>
                  {item.title}
                </div>
              ))}
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default MoreAction
