import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from "firebase";
import 'firebase/firestore';
import {Provider} from 'react-redux';
import store from './redux/store';

const firebaseConfig = {
  apiKey: "AIzaSyAQS1qAT4bHRtPj9NoN7F__NE4thrZXo28",
  authDomain: "instaclone-a86b9.firebaseapp.com",
  projectId: "instaclone-a86b9",
  storageBucket: "instaclone-a86b9.appspot.com",
  messagingSenderId: "598873086268",
  appId: "1:598873086268:web:db291454ce8fcfb4d62639",
  measurementId: "G-WW2NL065JB"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import HomeScreen from "./components/Home/Home";
import AddScreen from './components/Home/Add';
import SaveScreen from './components/Home/Save';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      isLoaded: false,
      loggedIn: false,
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          isLoaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          isLoaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, isLoaded} = this.state;
    if (!isLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Loading . . .</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Landing"}>
            <Stack.Screen name={'Landing'} component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name={'Register'} component={RegisterScreen}/>
            <Stack.Screen name={'Login'} component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Add' component={AddScreen} options={{headerShown: true}} navigation={this.props.navigation}/>
            <Stack.Screen name='Save' component={SaveScreen} options={{headerShown: true}} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white'
  }
});


