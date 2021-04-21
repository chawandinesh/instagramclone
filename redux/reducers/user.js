import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants'
const initialState = {
  currentUser: null,
  posts: []
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case USER_STATE_CHANGE: 
    //   return {
    //       ...state,
    //       currentUser: action.currentUser
    //   }
    default: {
      return {
        ...state,
        currentUser: action.currentUser,
      };
    }
  }
};
export default userReducer
