import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Tab = createMaterialBottomTabNavigator();

const ICON_SIZE = 26;
const ICON_COLOR = 'black';

import FeedScreen from '../Home/Feed';
import ProfileScreen from '../Home/Profile';
const EmptyScreen = () => null

import {fetchUser, fetchUserPosts, logoutUser} from "../../redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      isLoaded: false
    })
  }

  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchUserPosts()
  }

  render() {
    const {user} = this.props;
    if (!user) {
      return (<View style={styles.container}>
        <Button title='Go back'
          onPress={() => {
            console.log(this.props)
            this.props.navigation.navigate('Home', {screen: 'Login'})
          }}
        />
      </View>);
    } else {
      return (
        <Tab.Navigator initialRouteName={'Feed'} labeled={false} >
          <Tab.Screen name="Feed"
                      component={FeedScreen}
                      options={{
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons name='home' color={ICON_COLOR} size={ICON_SIZE}/>
                        )
                      }}/>
          <Tab.Screen name="MainAdd"
                      component={EmptyScreen}
                      listeners={({navigation}) => ({
                        tabPress: event => {
                          event.preventDefault();
                          navigation.navigate("Add")
                        }
                      })}
                      options={{
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons name='camera' color={ICON_COLOR} size={ICON_SIZE}/>
                        )
                      }}/>
          <Tab.Screen name="Profile"
                      component={ProfileScreen}
                      options={{
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons name='account-box' color={ICON_COLOR} size={ICON_SIZE}/>
                        )
                      }}/>
          <Tab.Screen name="Logout"
                      component={EmptyScreen}
                      listeners={() => ({
                        tabPress: () => {
                          this.props.logoutUser()
                        }
                      })}
                      options={{
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons name='door' color={ICON_COLOR} size={ICON_SIZE}/>
                        )
                      }}/>
        </Tab.Navigator>
      );
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.userReducer.user
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, logoutUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white'
  },
});