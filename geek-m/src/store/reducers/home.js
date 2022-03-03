import { SAVE_CHANNELS, SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST } from '../action_types/home'
const initValue = {
  userChannels: [],
  allChannels:[],
  articles:{}
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
        allChannels:payload
      }
    case SAVE_ARTICLE_LIST:
      return {
        ...state,
        articles:{
          ...state.articles,
          //属性名是表达式必须加中括号
          [payload.channelId]:{ 
            timestamp:payload.tempstamp,
            list:payload.list
          }
        }
      }
    default:
      return state
  }
}

export default reducer
