import noComment from '@/assets/none.png'
import NavBar from '@/components/NavBar'
import { http } from '@/utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'

const Article = () => {
  const [articleDetail, setArticleDetail] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const loadData = async () => {
      const res = await http.get(`/articles/${id}`)

      const newArticle = res.data.data
      setArticleDetail(newArticle)
    }

    loadData()
  }, [id])

  const {
    art_id,
    attitude,
    aut_id,
    aut_name,
    aut_photo,
    comm_count,
    content,
    is_collected,
    is_followed,
    like_count,
    pubdate,
    read_count,
    title
  } = articleDetail
  return (
    <div className={styles.root}>
      <NavBar
        rightContent={
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icongengduo"></use>
          </svg>
        }
      ></NavBar>

      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">
              马斯克公布猴子成功用“意念”打游戏，脑机接口技术距离人类还有多远？
            </h1>

            <div className="info">
              <span>04月14日</span>
              <span>709阅读</span>
              <span>8 评论</span>
            </div>

            <div className="author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className="follow">关注</span>
            </div>
          </div>

          <div className="content">
            <div className="content-html">
              近日，埃隆·马斯克所创建的脑机接口公司 Neuralink
              宣布再次取得了一场重大的研究成果，据其最新发布的《Monkey
              MindPong》视频显示，一只猴子正在轻松、反应敏捷地玩着电脑游戏，而令人惊讶的是，这只猴子靠的是“意念”。
            </div>
            <div className="date">发布文章时间：2019年03月11日</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">全部评论（0）</div>
          <img src={noComment} alt="" />
          <p className="no-comment">还没有人评论哦</p>
        </div>
      </div>

      <div className="footer">
        <div className="input-btn">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbianji"></use>
          </svg>
          <span>抢沙发</span>
        </div>
        <div className="action-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_qa"></use>
          </svg>
          <p>评论</p>
        </div>
        <div className="action-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_like2"></use>
          </svg>
          <p>点赞</p>
        </div>
        <div className="action-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_collect"></use>
          </svg>
          <p>收藏</p>
        </div>
        <div className="action-item">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_share"></use>
          </svg>
          <p>分享</p>
        </div>
      </div>
    </div>
  )
}

export default Article
