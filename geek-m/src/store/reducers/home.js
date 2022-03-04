import {
  SAVE_CHANNELS,
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
  SAVE_MORE_ARTICLE_LIST,
} from '../action_types/home'
const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {},
}
function reducer(state = initValue, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      }
    case SAVE_ALL_CHANNELS:
      return {
        ...state,
        allChannels: payload,
      }
    case SAVE_ARTICLE_LIST:
      //如果loadMore为true，代码加载更多数据，不应该覆盖，应该追加
      const { list, timestamp, channelId } = payload
      //旧的数据
      // const oldList = state.articles[channelId].list
      return {
        ...state,
        articles: {
          ...state.articles,
          //属性名是表达式必须加中括号
          [channelId]: {
            timestamp: timestamp,
            //如果是loadMore，追加数据，否则覆盖数据
            list:list,
          },
        },
      }
      case SAVE_MORE_ARTICLE_LIST:
        return{
          ...state,
          articles:{
            ...state.articles,
            [payload.channelId]:{
              timestamp:payload.timestamp,
              list:[...state.articles[payload.channelId].list,...payload.list]
            }

          }
        }
    default:
      return state
  }
}

export default reducer
