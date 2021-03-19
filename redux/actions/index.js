import {USER_LOGOUT, USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE} from "../constants";
import firebase from 'firebase';

export function fetchUser() {
  return ((dispatch) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists){
          dispatch({type: USER_STATE_CHANGE, payload: {...snapshot.data()}})
        }
        else {
          dispatch({type: USER_STATE_CHANGE, payload: null})
        }
      })
      .catch((err) => {
        console.error(err)
        dispatch({type: USER_STATE_CHANGE, payload: null})
      })
  })
}
// ===
export function fetchUserPosts() {
  return ((dispatch) => {
    firebase
      .firestore()
      .collection('post')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('createdAt', 'asc')
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data}
        })
        dispatch({type: USER_POSTS_STATE_CHANGE, payload: posts})

      })
      .catch((err) => {
        console.error(err)
        dispatch({type: USER_POSTS_STATE_CHANGE, payload: null})
      })
  })
}

export function logoutUser() {
  return ((dispatch) => {
    dispatch({type: USER_STATE_CHANGE, payload: null})
  })
}

export function loginUser(response) {
  return ((dispatch) => {
    console.log(response.user.toJSON())
    // dispatch({type: USER_STATE_CHANGE, payload: {...user.data()}})
  })
}
