import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import 'firebase/firestore'
import  firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onSignup = () => {
    const { name, email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });

        //   console.log(res)
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(name) => this.setState({ name })}
          placeholder="name"
        />
        <TextInput
          onChangeText={(email) => this.setState({ email })}
          placeholder="email"
        />
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
          placeholder="password"
        />
        <Button onPress={this.onSignup} title="Signup" />
      </View>
    );
  }
}
