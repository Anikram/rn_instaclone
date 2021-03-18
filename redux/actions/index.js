import {USER_STATE_CHANGE} from "../constants";
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
          dispatch({type: USER_STATE_CHANGE, user: snapshot.data()})
        }
        else {
          console.error("doesn't exists")
        }
      })
      .catch((err) => {
        console.error(err)
        dispatch({type: USER_STATE_CHANGE, user: null})
      })
  })
}