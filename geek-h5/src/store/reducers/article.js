const initialState = {
  isLoading: true,
  info: {},
  comment: {
    results: []
  },
  isCommentLoading: true
}

const article = (state = initialState, action) => {
  switch (action.type) {
    case 'article/pengding':
      return { ...state, isLoading: true }
    case 'article/success':
      return { ...state, info: action.payload, isLoading: false }
    case 'article/set_info':
      const partialInfo = action.payload
      return {
        ...state,
        info: {
          ...state.info,
          ...partialInfo
        }
      }
    case 'article/commeng_loading':
      return {
        ...state,
        isCommentLoading: true
      }
    case 'article/comment':
      return {
        ...state,
        isCommentLoading: false,
        comment: {
          ...action.payload,
          results: action.payload.results
        }
      }
    case 'article/comment_more':
      return {
        ...state,
        isCommentLoading: false,
        comment: {
          ...action.payload,
          results: [...state.comment.results, ...action.payload.results]
        }
      }

    case 'article/set_comment':
      const commentPartial = action.payload
      return {
        ...state,
        comment: {
          ...state.comment,
          ...commentPartial
        }
      }
    default:
      return state
  }
}

export { article }
