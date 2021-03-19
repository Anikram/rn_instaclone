import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from "react-native";
import {connect} from 'react-redux';

// const Post = ({url}) => (
//   <View style={styles.post}>
//     <Text style={styles.url}>{url}</Text>
//   </View>
// )
const Post = ({url}) => (
  <Image
    source={{uri: url}}
    style={styles.postImage}
  />
)

const Profile = ({user, posts}) => {

  const renderPost = ({item}) => (
    <Post url={item.url}/>
  )

  console.log(posts)
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.text}>{`${user.email}`}</Text>
      </View>

      <View style={styles.galleryContainer}>
        <FlatList
          data={posts}
          horizontal={false}
          numColumns={3}
          renderItem={renderPost}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (store) => (
  {
    user: store.userReducer.user,
    posts: store.userReducer.posts
  }
)

export default connect(mapStateToProps, null)(Profile)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'black',
  },
  infoContainer: {
    margin: 20,
  },
  galleryContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 3/2,
  },
  text: {
    color: 'black',
  },
  post: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  postImage: {
    width: '33%',
    // height: 1,
    aspectRatio: 1
  },
  url: {
    fontSize: 32,
  }
});