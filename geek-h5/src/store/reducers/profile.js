const initialState = {
  user: {},
  userProfile: {}
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'profile/user':
      return { ...state, user: { ...action.payload } }

    case 'profile/profile':
      return { ...state, userProfile: { ...action.payload } }

    case 'profile/update':
      const { name, value } = action.payload
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          [name]: value
        }
      }
    default:
      return state
  }
}

export { profile }
