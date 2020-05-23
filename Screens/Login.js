import React, {useState, Component} from 'react'
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import * as Google from "expo-google-app-auth";
import googleCloudConfig from "../GoogleCloudConfig";

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
                <Button title="Login with Google" onPress={this.signInWithGoogle} />
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
    }
});

export default Login;
