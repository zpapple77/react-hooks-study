import { http } from '@/utils'
import { Toast } from 'antd-mobile'

// 文章
const getPending = () => ({ type: 'article/pengding' })
const getSuccess = info => ({ type: 'article/success', payload: info })
const setInfo = partialInfo => ({
  type: 'article/set_info',
  payload: partialInfo
})

// 评论
const getCommentPengding = () => ({ type: 'article/commeng_loading' })
const getComment = list => ({ type: 'article/comment', payload: list })
const getCommentMore = list => ({ type: 'article/comment_more', payload: list })
const setComment = partial => ({
  type: 'article/set_comment',
  payload: partial
})

/**
 * 根据 id 获取文章详情
 * @param {number} id 文章id
 * @returns thunk
 */
const getArticleInfo = id => {
  return async dispatch => {
    try {
      dispatch(getPending())
      const res = await http.get(`/articles/${id}`)

      const articleInfo = res.data.data
      dispatch(getSuccess(articleInfo))
    } catch { }
  }
}

/**
 * 获取评论
 * @param {object} param0 评论类型 和 id
 * @returns thunk
 */
const getCommentList = ({ type, source }) => {
  return async dispatch => {
    try {
      dispatch(getCommentPengding())
      const params = {
        type,
        source
      }

      const res = await http.get('/comments', {
        params
      })

      dispatch(getComment(res.data.data))
    } catch { }
  }
}

/**
 * 获取评论
 * @param {object} param0 评论类型 和 id
 * @returns thunk
 */
const getMoreComment = ({ type, source, offset }) => {
  return async dispatch => {
    try {
      dispatch(getCommentPengding())
      const params = {
        type,
        source,
        offset
      }

      const res = await http.get('/comments', {
        params
      })

      dispatch(getCommentMore(res.data.data))
    } catch { }
  }
}

/**
 * 取消点赞
 * @param {string} id 文章id
 * @returns thunk
 */
const deleteLiking = id => {
  return async (dispatch, getState) => {
    const { article } = getState()

    try {
      await http.delete(`/article/likings/${id}`)
      dispatch(
        setInfo({
          attitude: 0,
          like_count: article.info.like_count - 1
        })
      )
    } catch { }
  }
}

/**
 * 文章点赞
 * @param {string} id 文章id
 * @returns thunk
 */
const updateLiking = id => {
  return async (dispatch, getState) => {
    const { article } = getState()

    try {
      await http.post('/article/likings', {
        target: id
      })

      dispatch(
        setInfo({
          attitude: 1,
          like_count: article.info.like_count + 1
        })
      )
    } catch { }
  }
}

/**
 * 取消收藏
 * @param {string} id 文章id
 * @returns thunk
 */
const deleteCollection = id => {
  return async dispatch => {
    try {
      await http.delete(`/article/collections/${id}`)

      dispatch(
        setInfo({
          is_collected: false
        })
      )
    } catch { }
  }
}

/**
 * 收藏
 * @param {string} id 文章id
 * @returns thunk
 */
const updateCollection = id => {
  return async dispatch => {
    try {
      await http.post('/article/collections', {
        target: id
      })

      dispatch(
        setInfo({
          is_collected: true
        })
      )
    } catch { }
  }
}

/**
 * 取消关注
 * @param {string} id 作者id
 * @returns thunk
 */
const deleteFollow = id => {
  return async dispatch => {
    try {
      await http.delete(`/user/followings/${id}`)

      dispatch(
        setInfo({
          is_followed: false
        })
      )
    } catch (e) {
      // console.log(e.message)
      Toast.info(e.response.data.message, 0.8)
    }
  }
}

/**
 * 关注
 * @param {string} id 作者id
 * @returns thunk
 */
const updateFollow = id => {
  return async dispatch => {
    try {
      await http.post('/user/followings', {
        target: id
      })
      dispatch(
        setInfo({
          is_followed: true
        })
      )
    } catch (e) {
      // console.dir(e)
      Toast.info(e.response.data.message, 0.8)
    }
  }
}

/**
 * 取消评论点赞
 * @param {string} id 评论id
 * @returns thunk
 */
const deleteCommentLiking = id => {
  return async (dispatch, getState) => {
    const { article } = getState()

    try {
      await http.delete(`/comment/likings/${id}`)
      dispatch(
        setComment({
          results: article.comment.results.map(item => {
            if (item.com_id === id) {
              return {
                ...item,
                like_count: item.like_count - 1,
                is_liking: false
              }
            }
            return item
          })
        })
      )
    } catch { }
  }
}

/**
 * 评论点赞
 * @param {string} id 评论id
 * @returns thunk
 */
const updateCommentLiking = id => {
  return async (dispatch, getState) => {
    const { article } = getState()
    try {
      await http.post('/comment/likings', {
        target: id
      })

      dispatch(
        setComment({
          results: article.comment.results.map(item => {
            if (item.com_id === id) {
              return {
                ...item,
                like_count: item.like_count + 1,
                is_liking: true
              }
            }
            return item
          })
        })
      )
    } catch { }
  }
}

export {
  getArticleInfo,
  setInfo,
  getCommentList,
  getMoreComment,
  setComment,
  deleteLiking,
  updateLiking,
  deleteCollection,
  updateCollection,
  deleteFollow,
  updateFollow,
  deleteCommentLiking,
  updateCommentLiking
}
