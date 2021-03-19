import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import Constants from "expo-constants";
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from "firebase";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: Constants.manifest.apiKey,
  authDomain: Constants.manifest.authDomain,
  projectId: Constants.manifest.projectId,
  storageBucket: Constants.manifest.storageBucket,
  messagingSenderId: Constants.manifest.messagingSenderId,
  appId: Constants.manifest.appId,
  measurementId: Constants.manifest.measurementId,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
// import {NavigationContainer} from '@react-navigation/native';
// import {Provider} from 'react-redux';
//
import LoadedAppScreen from "./components/LoadedApp";
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts, loginUser, logoutUser} from "./redux/actions";
import {connect, Provider} from "react-redux";
import store from "./redux/store";
// import LandingScreen from "./components/auth/Landing";
// import RegisterScreen from "./components/auth/Register";
// import LoginScreen from "./components/auth/Login";
// import HomeScreen from "./components/Home/Home";
// import AddScreen from './components/Home/Add';
// import SaveScreen from './components/Home/Save';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      isLoaded: false,
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          isLoaded: true,
        })
      } else {
        this.setState({
          isLoaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, isLoaded} = this.state;
    console.log('loggedIn: ', loggedIn)
    console.log('isLoaded: ', isLoaded)
    if (!isLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Loading . . .</Text>
        </View>
      )
    }
    return (
      <Provider store={store}>
        <LoadedAppScreen user={this.props.user}/>
      </Provider>)

  }
}

const mapStateToProps = (store) => ({
  user: store.userReducer.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, logoutUser, loginUser}, dispatch)

const AppContainer =  connect(mapStateToProps, mapDispatchToProps)(App);

const InstaCloneApp = () => {
  return (
    <Provider store={store}>
        <AppContainer store={store}/>
    </Provider>
  )
}

export default InstaCloneApp

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


