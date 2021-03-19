import {USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE} from "../constants";

const initialState = {
  user: null,
  posts: []
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        user: action.payload
      }
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.payload
      }
    default:
      return {
        state
      }
  }
}
