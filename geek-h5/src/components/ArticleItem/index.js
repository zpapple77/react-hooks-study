import { memo } from 'react'
import classnames from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import Icon from '@/components/Icon'
import Image from '@/components/Image'

import styles from './index.module.scss'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const ArticleItem = memo(
  ({
    art_id,
    type,
    title,
    images,
    aut_name,
    comm_count,
    pubdate,
    isLogin,
    onFeedback
  }) => {
    return (
      <div className={styles.root}>
        <div
          className={classnames(
            'article-content',
            type === 3 ? 't3' : '',
            type === 0 ? 'none-mt' : ''
          )}
        >
          <h3>{title}</h3>
          {type !== 0 && (
            <div className="article-imgs">
              {images.map((item, i) => {
                return (
                  <div className="article-img-wrapper" key={i}>
                    <Image src={item} />
                    {/* <img src={item} alt="" /> */}
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div
          className={classnames('article-info', type === 0 ? 'none-mt' : '')}
        >
          <span>{aut_name}</span>
          <span>{comm_count} 评论</span>
          <span>{dayjs().from(pubdate)}</span>
          {isLogin && (
            <span
              className="close"
              onClick={e => {
                e.stopPropagation()
                onFeedback(art_id)
              }}
            >
              <Icon type="iconbtn_essay_close" />
            </span>
          )}
        </div>
      </div>
    )
  }
)

export default ArticleItem
