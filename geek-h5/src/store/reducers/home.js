const initialState = {
  userChannel: [],
  recommendChannel: [],
  article: {
    results: [],
    pre_timestamp: +new Date()
  },
  moreAction: {
    id: 0,
    visible: false
  }
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'home/channel':
      return {
        ...state,
        userChannel: action.payload
      }

    case 'home/recommend':
      return {
        ...state,
        recommendChannel: action.payload
      }

    case 'home/article':
      return {
        ...state,
        article: action.payload
      }

    case 'home/more':
      return {
        ...state,
        article: {
          ...action.payload,
          results: [...state.article.results, ...action.payload.results]
        }
      }
    case 'home/more_action':
      return {
        ...state,
        moreAction: action.payload
      }
    default:
      return state
  }
}

export { home }
