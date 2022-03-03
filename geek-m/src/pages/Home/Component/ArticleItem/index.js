import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' //导入中文包
dayjs.extend(relativeTime) //扩展dayjs,让它有相对时间的功能
dayjs.locale('zh-cn')

const ArticleItem = ({ article }) => {
  //解构
  const {
    cover: { type, images },
    title,
    auth_name,
    comm_count,
    pubdate,
  } = article
  return (
    <div className={styles.root}>
      <div
        className={classnames('article-content', {
          t3: type === 3,
          'none-mt': type === 0,
        })}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => {
              return (
                <div className="article-img-wrapper" key={i}>
                  {/* <Image src={item} /> */}
                  <img src={item} alt="" />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{auth_name}</span>
        <span>{comm_count}评论</span>
        {/* fromNow距离现在的事件 */}
        <span>{dayjs(pubdate).fromNow()}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}
export default ArticleItem
