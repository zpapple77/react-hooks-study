import { SAVE_CHANNELS } from '../action_types/home'
const initValue = {
  userChannels: [],
}
function reducer(state = initValue, action) {
  console.log(action)
  const { type, payload } = action
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      }
    default:
      return state
  }
}

export default reducer
