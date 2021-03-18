const initialState = {
  user: null,
}

export const userReducer = (state = initialState, action) => {
  return {
    ...state,
    user: action.user
  }
}
