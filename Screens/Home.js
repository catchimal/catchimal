import React, {useState, Component} from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {RaisedTextButton} from 'react-native-material-buttons';
import * as Google from "expo-google-app-auth";
import googleCloudConfig from "../GoogleCloudConfig";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    logout = async () => {
        try {
            const result = await Google.logOutAsync({
                accessToken: this.props.navigation.getParam('token'),
                androidClientId: googleCloudConfig.ANDROID_CLIENT_ID,
                iosClientId: googleCloudConfig.IOS_CLIENT_ID
            });
            if (result.type === "default" && result.status === 200) {
                return this.props.navigation.navigate('Login'); //after Google logout redirect to Login
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log('Error with logout', e);
            return { error: true };
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text> Home Screen </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Welcome, {this.props.navigation.getParam('username')}
                </Text>
                <RaisedTextButton
                    title={'Sign out'}
                    onPress={this.logout}
                />
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

export default Home;