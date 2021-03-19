import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import LandingScreen from "./auth/Landing";
import RegisterScreen from "./auth/Register";
import LoginScreen from "./auth/Login";
import {connect, Provider} from "react-redux";
import store from "../redux/store";
import HomeScreen from "./Home/Home";
import AddScreen from "./Home/Add";
import SaveScreen from "./Home/Save";
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts, logoutUser} from "../redux/actions";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

class LoadedApp extends Component {
  constructor(props) {
    super(props);
    this.state = ({

    })
  }

  render() {
    const { user } = this.props
    console.log(user)
    if (!user) {
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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Add' component={AddScreen} options={{headerShown: true}} navigation={this.props.navigation}/>
            <Stack.Screen name='Save' component={SaveScreen} options={{headerShown: true}} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

export default LoadedApp;