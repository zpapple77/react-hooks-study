import ArticleItem from '@/components/ArticleItem'
import NavBar from '@/components/NavBar'
import { getSearchList } from '@/store/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'

const Result = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const articles = useSelector(state => state.search.searchList)
  const params = new URLSearchParams(location.search)
  const q = params.get('q')

  useEffect(() => {
    dispatch(getSearchList(q))
  }, [q, dispatch])

  const onToAritcleDetail = art_id => {
    history.push(`/article/${art_id}`)
  }

  // const { page, per_page, results, total_count } = articles
  const { results } = articles

  return (
    <div className={styles.root}>
      <NavBar onLeftClick={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {results?.map(item => {
          const {
            aut_name,
            comm_count,
            pubdate,
            title,
            art_id,
            cover: { type, images }
          } = item

          const articleItemProps = {
            type,
            title,
            aut_name,
            comm_count,
            pubdate,
            images
          }

          return (
            <div key={art_id} onClick={() => onToAritcleDetail(art_id)}>
              <ArticleItem key={item.art_id} {...articleItemProps} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Result
