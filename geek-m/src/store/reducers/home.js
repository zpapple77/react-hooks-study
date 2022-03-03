import { SAVE_CHANNELS, SAVE_ALL_CHANNELS } from '../action_types/home'
const initValue = {
  userChannels: [],
  allChannels:[]
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
    default:
      return state
  }
}

export default reducer
