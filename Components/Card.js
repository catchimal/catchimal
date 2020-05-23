import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function Card(props){
  if(props.theme===true){
    return(
        <View style={{...styles.bright, ...props.style}}>
          {props.children}
        </View>
    );
  }
  else{
    return(
      <View style={{...styles.dark, ...props.style}}>
        {props.children}
      </View>
  );
  }
}

const styles = StyleSheet.create({
  dark:{
    shadowColor:'black',
    shadowOffset:{width:0, height:2},
    shadowRadius:6,
    backgroundColor:'black',
    elevation:10,
    padding:20,
    borderRadius:50,
    margin:5,
  },
  bright:{
    shadowColor:'black',
    shadowOffset:{width:0, height:2},
    shadowRadius:6,
    backgroundColor:'white',
    elevation:10,
    padding:20,
    borderRadius:50,
    margin:5,
  }
});

export default Card;