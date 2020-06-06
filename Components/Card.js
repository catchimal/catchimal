import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function Card(props){
    return(
        <View style={{...styles.bright, ...props.style}}>
          {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
  bright:{
    shadowColor:'black',
    shadowOffset:{width:0, height:2},
    shadowRadius:6,
    backgroundColor:'#4A693B',
    elevation:10,
    padding:20,
    borderRadius:20,
    margin:5,
  }
});

export default Card;