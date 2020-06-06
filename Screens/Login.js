import React, {useState, Component} from 'react'
import {
    View,
    StyleSheet,
    Button, StatusBar
} from 'react-native';
import * as Google from "expo-google-app-auth";
import { Icon } from 'react-native-elements'
import googleCloudConfig from "../GoogleCloudConfig";
import ActionBar from "../Components/ActionBar";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    signInWithGoogle = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: googleCloudConfig.IOS_CLIENT_ID,
                androidClientId: googleCloudConfig.ANDROID_CLIENT_ID,
                scopes: ['profile', 'email']
            });

            if (result.type === "success") {
                this.props.navigation.navigate('Home', {
                    username: result.user.givenName,
                    token: result.accessToken
                }); //after Google login redirect to Home
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log('Error with login', e);
            return { error: true };
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Icon name="mood" size={80} color="gray"/>
                <StatusBar barStyle="dark-content"/>
                <ActionBar
                    style={[styles.actionBar, styles.title]}
                    name={'Catchimal'}
                />
                <Button title="Login with Google"  onPress={this.signInWithGoogle} />
                <Icon name="pets" size={50}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    actionBar: {
        backgroundColor: '#FFFFFF'
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        color: '#AD9A89',
        letterSpacing: 10,
        marginVertical:20
    },
});

export default Login;
