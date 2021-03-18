import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const Feed = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed</Text>
    </View>
  )
}

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  }
});