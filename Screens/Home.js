import React, { useState, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Button,
  ActivityIndicator,
} from "react-native";
import ActionBar from "../Components/ActionBar";
import AnimalCard from "../Components/AnimalCard";
import { Icon } from "react-native-elements";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

function Home(props) {
  const [userName, setUserName] = useState(
    props.navigation.getParam("username")
  );
  const [userRating, setUserRating] = useState(1500);
  const [userFriends, setUserFriends] = useState(0);
  const [userLikes, setUserLikes] = useState(0);

  const DATA = [
    {
      name: "Dogoo",
      url:
        "https://specials-images.forbesimg.com/imageserve/5db4c7b464b49a0007e9dfac/960x0.jpg?fit=scale",
    },
    {
      name: "Rabbitu",
      url:
        "https://media.newyorker.com/photos/5a8862150095ae7e55570156/1:1/w_1362,h_1362,c_limit/Mead-Peter-Rabbit.jpg",
    },
    {
      name: "Racooon",
      url:
        "https://c4.wallpaperflare.com/wallpaper/666/775/773/rocket-raccoon-guardians-of-the-galaxy-2-wallpaper-preview.jpg",
    },
    {
        name:"Catie",
        url:"https://cdn.pixabay.com/photo/2014/11/30/14/11/kitty-551554__340.jpg"
    },
    {
        name:"Hedgehog",
        url:"https://cdn.pixabay.com/photo/2016/02/22/10/06/hedgehog-1215140__340.jpg"
    }
  ];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sup {userName}</Text>
      </View>
      <View style={styles.descp}>
        <Text style={styles.text}>Rating : {userRating}</Text>
        <Text style={styles.text}>Friends : {userFriends}</Text>
        <Text style={styles.text}>Total Likes : {userLikes}</Text>
      </View>
      <View>
        <Text style={styles.header}>
          Your Cute <Text style={{ fontWeight: "bold" }}>Collection</Text>
        </Text>
      </View>

      <FlatList
        data={DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
            <AnimalCard name={item.name} url={item.url} />
        )}
      />

      <Icon
        name="add"
        raised
        reverse
        color="#FC9F57"
        onPress={() =>
          props.navigation.navigate("TakePic", {
            username: userName,
            token: props.navigation.getParam("token"),
          })
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionBar: {
    backgroundColor: "#FFFFFF",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    color: "#112820",
    letterSpacing: 5,
    marginVertical: 20,
    fontWeight: "bold",
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    color: "#4A693B",
    letterSpacing: 2,
    marginVertical: 20,
  },
  descp: {
    alignSelf: "flex-start",
    marginHorizontal: 40,
  },
  text: {
    fontSize: 20,
    color: "gray",
  },
});
export default Home;
