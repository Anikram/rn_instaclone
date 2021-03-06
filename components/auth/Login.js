import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native';

import * as firebase from "firebase";
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts, loginUser, logoutUser} from "../../redux/actions";
import {connect} from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }

    this.onSignIn = this.onSignIn.bind(this)
  }

  onSignIn() {
    const { email, password, name } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.props.fetchUser()
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <View>
        <TextInput placeholder={'email'} onChangeText={(email) => this.setState({ email })}/>
        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>

        <Button title={'Sign in'} onPress={() => this.onSignIn()}/>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({loginUser,fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);

