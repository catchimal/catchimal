import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import Card from "./Card";
import { TouchableOpacity } from "react-native-gesture-handler";

function AnimalCard(props) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.6} onPress={() => {alert("No Images to show, add some first!")}}>
        <Card>
          <Text style={styles.header}>{props.name}</Text>
          <Image style={styles.image} source={{ uri: props.url }} alt="image" />
        </Card>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 32,
    color: "white",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default AnimalCard;
