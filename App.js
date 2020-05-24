import React, {useState} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {AppLoading, SplashScreen} from 'expo';
import AppNavigator from "./Screens/AppNavigator";
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "./Redux/Reducers/Index";
import * as Font from 'expo-font';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  SplashScreen.preventAutoHide();
  const store = createStore(
      allReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  Font.loadAsync({
    // load fonts here
  }).then(() => {
    SplashScreen.hide();
    setAppReady(true);
  });
  if(appReady) {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <AppNavigator />
          </View>
        </Provider>
    );
  } else {
    return (
        <AppLoading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
