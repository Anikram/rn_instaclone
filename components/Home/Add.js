import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({navigation}) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(() => galleryStatus.status === 'granted');
    })();

  }, [cameraPermission, galleryPermission]);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (cameraPermission === null || galleryPermission === false) {
    return <View/>
  }
  if (cameraPermission === false || galleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera}
                ref={ref => setCamera(ref)}
                type={type}
                ratio={'2:3'}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title='Flip image'
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}/>
        <Button
          style={styles.button}
          title='Take picture'
          onPress={() => {
            takePicture()
          }}/>
        <Button
          style={styles.button}
          title='Choose from gallery'
          onPress={() => {
            pickImage()
          }}/>
        <Button
          style={styles.button}
          title='Save'
          onPress={() => {
            navigation.navigate('Save', { image })
          }}/>
        {image && <Image source={{uri: image}} style={styles.preview}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  button: {},
  text: {
    fontSize: 18,
    color: 'white',
  },
});
