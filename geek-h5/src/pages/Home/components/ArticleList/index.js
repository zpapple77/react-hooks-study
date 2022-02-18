import ArticleItem from '@/components/ArticleItem'
import { setMoreAction } from '@/store/actions'
import { http, isAuth } from '@/utils'
import { PullToRefresh } from 'antd-mobile'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { areEqual, VariableSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import styles from './index.module.scss'

const Row = memo(({ index, style, data, setSize }) => {
  const dispatch = useDispatch()
  const isLogin = isAuth()
  const rowRef = useRef()
  const history = useHistory()
  const item = data.list[index]

  // console.log(data, item)
  // https://tiagohorta1995.medium.com/dynamic-list-virtualization-using-react-window-ab6fbf10bfb2
  useEffect(() => {
    if (rowRef.current) {
      setSize(index, rowRef.current.scrollHeight)
    }
  }, [rowRef, index, setSize])

  if (!item) {
    return (
      <ContentLoader
        speed={2}
        width={375}
        height={137}
        viewBox="0 0 375 137"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="16" y="15" rx="3" ry="3" width="223" height="22" />
        <rect x="245" y="14" rx="3" ry="3" width="110" height="80" />
        <rect x="16" y="105" rx="0" ry="0" width="50" height="22" />
        <rect x="76" y="105" rx="0" ry="0" width="50" height="22" />
        <rect x="136" y="105" rx="0" ry="0" width="50" height="22" />
      </ContentLoader>
    )
  }

  const { art_id } = item

  const onToAritcleDetail = () => {
    history.push(`/article/${art_id}`)
  }

  const onFeedback = art_id => {
    dispatch(setMoreAction({
      id: art_id,
      visible: true
    }))
  }

  const {
    aut_name,
    comm_count,
    pubdate,
    title,
    cover: { type, images }
  } = item

  const articleItemProps = {
    art_id,
    type,
    title,
    aut_name,
    comm_count,
    pubdate,
    images,
    isLogin
  }

  return (
    <div
      style={style}
      className="article-item"
      ref={rowRef}
      onClick={onToAritcleDetail}
    >
      <ArticleItem {...articleItemProps} onFeedback={onFeedback} />

      {!data.hasMore && index === data.list.length - 1 && (
        <div className="list-no-more">没有更多文章了</div>
      )}
    </div>
  )
}, areEqual)

const ArticleList = ({ channelId, activeId }) => {
  const listRef = useRef()
  const sizeMap = useRef({})

  const setSize = useCallback((index, size) => {
    if (sizeMap.current[index]) return
    sizeMap.current = { ...sizeMap.current, [index]: size }
    // https://github.com/bvaughn/react-window/issues/6#issuecomment-548897123
    listRef.current.resetAfterIndex(index)
  }, [])

  const getSize = useCallback(index => {
    return sizeMap.current[index] || 70
  }, [])

  const [refreshing, setRefreshing] = useState(false)

  const [articles, setArticles] = useState({
    list: [],
    preTimestamp: +new Date()
  })

  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const res = await http.get('/articles', {
        params: {
          channel_id: channelId,
          timestamp: +new Date()
        }
      })

      const { results, pre_timestamp } = res.data.data

      setArticles({
        list: results,
        preTimestamp: pre_timestamp
      })
    }

    // 保证只在组件第一次被“激活”并且 list 列表为空时，发送请求
    // 激活：activeId === channelId
    if (activeId === channelId && articles.list.length === 0) {
      loadData()
    }
  }, [channelId, activeId, articles])

  const loadMoreItems = (startIndex, stopIndex) => {
    // 列表数据为空时，说明当前 tab 还没有被激活，此时，不需要加载数据
    if (articles.list.length === 0) return Promise.resolve()

    return new Promise(async resolve => {
      const res = await http.get('/articles', {
        params: {
          channel_id: channelId,
          timestamp: articles.preTimestamp
        }
      })

      resolve()

      const { results, pre_timestamp } = res.data.data

      if (!pre_timestamp) {
        setHasMore(false)
      } else {
        setArticles({
          list: [...articles.list, ...results],
          preTimestamp: pre_timestamp
        })
      }
    })
  }

  const onPullToRefresh = async () => {
    setRefreshing(true)
    const res = await http.get('/articles', {
      params: {
        channel_id: channelId,
        timestamp: +new Date()
      }
    })

    const { results, pre_timestamp } = res.data.data
    setArticles({
      list: results,
      preTimestamp: pre_timestamp
    })

    // 主动加载下一页数据
    loadMoreItems()
    setRefreshing(false)
  }

  const isItemLoaded = index => {
    return !!articles.list[index]
  }

  // const itemCount = hasMore ? articles.list.length + 1 : articles.list.length
  const itemCount = hasMore ? articles.list.length + 1 : articles.list.length

  return (
    <div
      className={styles.root}
      style={{ display: activeId === channelId ? 'block' : 'none' }}
    >
      <PullToRefresh
        damping={60}
        refreshing={refreshing}
        onRefresh={onPullToRefresh}
      >
        <div className="articles">
          {/* https://bvaughn.github.io/forward-js-2017/#/12/5 */}
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => {
              return (
                <List
                  height={(window.innerHeight - 90) * (window.innerWidth / 375)}
                  itemCount={itemCount}
                  itemSize={getSize}
                  onItemsRendered={onItemsRendered}
                  itemData={{
                    list: articles.list,
                    hasMore
                  }}
                  ref={list => {
                    // https://github.com/bvaughn/react-window/issues/324#issuecomment-528887341
                    if (list) {
                      ref(list)
                      listRef.current = list
                    }
                  }}
                >
                  {/* {Row} */}
                  {props => <Row {...props} setSize={setSize} />}
                </List>
              )
            }}
          </InfiniteLoader>
        </div>
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
