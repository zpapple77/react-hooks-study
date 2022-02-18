const initialState = {
  suggest: [],
  searchList: []
}

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'search/suggetion':
      return {
        ...state,
        suggest: action.payload
      }
    case 'search/clear':
      return {
        ...state,
        suggest: []
      }
    case 'search/list':
      return {
        ...state,
        searchList: action.payload
      }
    default:
      return state
  }
}

export { search }
