import React from 'react';
import { Text, View, Button, StyleSheet } from "react-native";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title={'Register'} onPress={() => navigation.navigate("Register")}/>
      <Button title={'Login'} onPress={() => navigation.navigate("Login")}/>
    </View>
  )
}

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});
