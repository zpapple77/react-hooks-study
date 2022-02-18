import { http } from '@/utils'

// 获取输入建议列表
const setSuggetionList = list => ({ type: 'search/suggetion', payload: list })

// 清空搜索建议
const clear = () => ({ type: 'search/clear' })

// 获取搜索文章列表
const setSearchList = list => ({ type: 'search/list', payload: list })

/**
 * 获取输入联想建议列表
 * @param {string} q 查询内容
 * @returns thunk
 */
const getSuggestion = q => {
  return async dispatch => {
    const res = await http.get('/suggestion', {
      params: {
        q
      }
    })

    const { options } = res.data.data
    const suggestionList = options.map(item => {
      const [suggest, rest = ''] = item.split(' ')
      return {
        suggest,
        rest
      }
    })
    dispatch(setSuggetionList(suggestionList))
  }
}

/**
 * 清空建联想议列表
 * @returns thunk
 */
const clearSuggestion = () => {
  return dispatch => {
    dispatch(clear())
  }
}

/**
 * 获取搜索文章列表
 * @param {string} q 查询内容
 * @returns thunk
 */
const getSearchList = q => {
  return async dispatch => {
    try {
      const res = await http.get('/search', {
        params: {
          q
        }
      })

      dispatch(setSearchList(res.data.data))
    } catch {}
  }
}

export { getSuggestion, clearSuggestion, getSearchList }
