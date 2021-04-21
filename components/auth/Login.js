import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onSignup = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(email) => this.setState({ email })}
          placeholder="email"
        />
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
          placeholder="password"
        />
        <Button onPress={this.onSignup} title="Sign In" />
      </View>
    );
  }
}
