import React, { useState } from "react";

import {
    StyleSheet,
    View,
    ActivityIndicator, StatusBar, ScrollView, TouchableOpacity, Text
} from "react-native";
import ActionBar from "./ActionBar";
import * as _ from 'lodash';

let animalList = (props) => {

  let [ facts, setFacts ] = useState([]);

  let getCatFacts = async () => {
    let response = await fetch(
        'https://cat-fact.herokuapp.com/facts',
        {
          headers: {
            Accept: 'application/json',
          },
          method: 'GET',
        }
    );
    let responseJson = await response.json();
    // take top 20
    let topFacts = _.take(responseJson.all, 20);
    setFacts(topFacts);
    console.log(topFacts);
  };

  getCatFacts();

  let catFacts = (<View>
  </View>);
  catFacts = facts.map((fact, index) => {
      return (
          <TouchableOpacity key={index} style={styles.factsContainer}>
              <View key={index + 1} style={{
                      height: 'auto',
                      width: 'auto',
                      margin: 10,
                      padding: 10,
                      borderRadius: 15,
                  }}>
                  <View style={styles.factView} key={index + 2}>
                      <Text style={styles.factTextView} key={index + 3} numberOfLines={5}>
                          {fact.text}
                      </Text>
                  </View>
              </View>
          </TouchableOpacity>
      )
  });

  if (facts.length < 1) {
    return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <ActionBar
              style={[styles.actionBar, styles.title]}
              name={'Catchimal'}
              backArrow={true}
              data={props}
          />
          <View style={{alignSelf: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={"large"} color={'AD9A89'}/>
          </View>
        </View>
    );
  } else {
      return (
          <View style={styles.container}>
              <StatusBar barStyle="dark-content"/>
              <ActionBar
                  style={[styles.actionBar, styles.title]}
                  name={'Catchimal'}
                  backArrow={true}
                  data={props}
              />
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                  {catFacts}
              </ScrollView>
          </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBBBB",
  },
  actionBar: {
    backgroundColor: '#FFBBBB'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#AD9A89',
    letterSpacing: 3
  },
    scrollViewContainer: {
        borderRadius: 15,
        height: 'auto',
    },
    factView: {
        padding: 5,
        borderRadius: 5,
    },
    factTextView: {
        fontSize: 24,
        color: '#FFFFFF'
    },
    factsContainer: {
      backgroundColor: '#FFBBBB'
    }
});

export default animalList;
