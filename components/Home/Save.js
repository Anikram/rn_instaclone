import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Image, Button} from "react-native";
import firebase from "firebase";
import {bindActionCreators} from "redux";
import {fetchUserPosts} from "../../redux/actions";
import {connect} from "react-redux";
require('firebase/firebase-storage')
require('firebase/firestore')

const Save = ({navigation, ...props}) => {
  const [caption, setCaption] = useState('')
  const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
  const photoUri = props.route.params.image

  const uploadImage = async () => {
    const uri = props.route.params.image
    const response = await fetch(uri)
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(childPath)
      .put(blob)

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL()
        .then((snapshot) => {
          savePostData(snapshot)
          console.log(snapshot)
        })
    }

    const taskError = snapshot => {
      console.error(snapshot)
    }

    task.on('state_changed', taskProgress , taskError, taskCompleted)

  }

  const savePostData = (url) => {
    firebase.firestore()
      .collection('post')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        url,
        caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        navigation.popToTop()
        this.props.fetchUserPosts()
    })
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: photoUri}} style={styles.photo}/>
      <TextInput
        placeholder='Write a caption . . .'
        onChangeText={(caption)=>setCaption(caption)}
      />
      <Button
        title="Save"
        onPress={() => uploadImage()}
      />
    </View>
  )
}
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUserPosts}, dispatch)

export default connect(null, mapDispatchToProps)(Save)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  text: {
    color: 'white',
  }
});