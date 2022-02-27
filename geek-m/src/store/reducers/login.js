const initValues = {
  token: '',
  refresh_token: '',
}
export default function reducer(state = initValues, action) {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload
  }
  if (type === 'login/logout') {
      //清除token
    return {}
  }
  return state
}
