const initialState = {
  token: '',
  refresh_token: ''
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'login/token':
      return { ...action.payload }
    default:
      return state
  }
}

export { login }
