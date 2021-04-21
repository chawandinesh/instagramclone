import  firebase from "firebase";
import 'firebase/firestore'
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  return (dispatch) => {
    console.log(firebase.auth().currentUser.uid);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("not exists");
        }
      });
  };
}
