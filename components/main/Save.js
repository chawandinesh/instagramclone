import React, { useState } from "react";
import firebase from "firebase";
import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
require("firebase/firestore");
require("firebase/firebase-storage");
export default function Save(props) {
  const [caption, setCaption] = useState();
  console.log(caption);

  const savePostData = (downloadUrl) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
          caption,
          downloadUrl,
          creation: firebase.firestore.FieldValue.serverTimestamp()

      }).then((res) => {
          props.navigation.popToTop()
      })
  };

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(snapshot.bytesTransferred);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((resSnap) => {
        savePostData(resSnap);
        console.log(resSnap);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput placeholder="Write a caption..." onChangeText={setCaption} />
      <Button onPress={uploadImage} title="Save" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
