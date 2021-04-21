import React, { Component } from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import { View, Text, LogBox, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from './components/main/Save'
const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpR20UI3zwXWSy831jtoiY25k5RTBtsqQ",
  authDomain: "instagram-dev-c48ea.firebaseapp.com",
  projectId: "instagram-dev-c48ea",
  storageBucket: "instagram-dev-c48ea.appspot.com",
  messagingSenderId: "753250639631",
  appId: "1:753250639631:web:18ae8427a1bc355c2ee87a",
  measurementId: "G-THDYRTHKTH",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    LogBox.ignoreAllLogs(true)

    this.state = {
      loaded: false,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          isLoggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          isLoggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loaded, isLoggedIn } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!isLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Add" component={AddScreen} />
              <Stack.Screen name="Save" component={SaveScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    );
  }
}
