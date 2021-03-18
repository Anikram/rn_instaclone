import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';



class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    const { email, password, firstName, lastName } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName,
            lastName,
            email,
            password,
          })
        console.log(firebase.auth().currentUser.uid)
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <View>
        <TextInput placeholder={'firstName'} onChangeText={(firstName) => this.setState({ firstName })}/>
        <TextInput placeholder={'lastName'} onChangeText={(lastName) => this.setState({ lastName })}/>
        <TextInput placeholder={'email'} onChangeText={(email) => this.setState({ email })}/>
        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>

        <Button title={'Sign up'} onPress={() => this.onSignUp()}/>
      </View>
    );
  }
}

export default Register;
