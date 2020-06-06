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

function Details() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Presenting {name}</Text>
      </View>
    </View>
  )
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
  }
})

export default Details
