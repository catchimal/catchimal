import React, {useState, Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import {RaisedTextButton} from 'react-native-material-buttons';
import * as Google from "expo-google-app-auth";
import googleCloudConfig from "../GoogleCloudConfig";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AnimalList from "../Components/AnimalList";
import ActionBar from "../Components/ActionBar";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: '',
            hasPermission: null,
            type: Camera.Constants.Type.back,
            launchCamera: false,
            error: null,
            identifiedImage: ''
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            this.setState({ hasPermission: status === 'granted' });
        }
    }

    handleCameraType=()=>{
        const { cameraType } = this.state;

        this.setState({cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    };

    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64: true
            });
            this.setState({selectedImage: photo.uri, base64Image: photo.base64});
            this.setState({launchCamera: false});
            this.setState({identifiedImage: ''});
        }
    };

    launchCamera = () => {
        this.setState({identifiedImage: ''});
        this.setState({selectedImage: ''});
        this.setState({launchCamera: true});
    };

    closeCamera = () => {
        this.setState({launchCamera: false});
    };

    openImagePickerAsync = async () => {
        this.setState({identifiedImage: ''});
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: false,
            aspect: [4, 3]
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        this.setState({
            selectedImage: pickerResult.uri,
            base64Image: pickerResult.base64
        });

        this.setState({launchCamera: false});
    };

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

    submitToGoogle = async () => {
        try {
            this.setState({ uploading: true, loading: true });
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: 'OBJECT_LOCALIZATION', maxResults: 1 },
                        ],
                        image: {
                            content: this.state.base64Image
                        }
                    }
                ]
            });

            console.log(this.state.selectedImage);
            let response = await fetch(
                'https://vision.googleapis.com/v1/images:annotate?key=' +
                googleCloudConfig.API_KEY,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: body
                }
            );
            let responseJson = await response.json();
            console.log(responseJson);

            let result = responseJson.responses[0].localizedObjectAnnotations[0].name;

            this.setState({
                googleResponse: responseJson,
                uploading: false,
                identifiedImage: result,
                loading: false
            });
        } catch (error) {
            console.log(error);
        }
    };

    uploadPhotoToCloud = () => {

    };

    render() {
        if (!this.state.launchCamera) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content"/>
                    <ActionBar
                        style={[styles.actionBar, styles.title]}
                        name={'Catchimal'}
                        error={this.state.error}
                    />
                    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"handled"}
                                keyboardDismissMode={"on-drag"}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, margin: 5 }}>
                            Welcome, {this.props.navigation.getParam('username')}
                        </Text>
                        {this.state.selectedImage !== '' && (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: this.state.selectedImage }}
                                    style={styles.thumbnail}
                                />
                                {this.state.loading && (
                                    <View style={{padding: 10, margin: 5}}>
                                        <ActivityIndicator color={'#AD9A89'} size={24}/>
                                    </View>
                                )}
                                {!this.state.loading && (
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, margin: 5 }}>
                                        {this.state.identifiedImage}
                                    </Text>
                                )}
                            </View>
                        )}
                        <View style={styles.buttonsContainer}>
                            {this.state.selectedImage === '' && (
                                <View style={styles.selectFileButton}>
                                    <RaisedTextButton
                                        title={'Select photo'}
                                        onPress={this.openImagePickerAsync}
                                        titleColor={'#FFFFFF'}
                                        color={'#F7B801'}
                                        titleStyle={{fontSize: 20}}
                                    />
                                </View>
                            )}
                            {this.state.selectedImage === '' && (
                                <View style={styles.selectFileButton}>
                                    <RaisedTextButton
                                        title={'Camera'}
                                        onPress={this.launchCamera}
                                        titleColor={'#FFFFFF'}
                                        color={'#F7B801'}
                                        titleStyle={{fontSize: 20}}
                                    />
                                </View>
                            )}
                            {this.state.selectedImage !== '' && (<View style={styles.selectFileButton}>
                                <RaisedTextButton
                                    title={'Retake Photo'}
                                    onPress={this.launchCamera}
                                    titleColor={'#FFFFFF'}
                                    color={'#F7B801'}
                                    titleStyle={{fontSize: 20}}
                                />
                            </View>)}
                            {this.state.selectedImage !== '' && (<View style={styles.selectFileButton}>
                                <RaisedTextButton
                                    title={'Analyze Photo'}
                                    onPress={this.submitToGoogle}
                                    titleColor={'#FFFFFF'}
                                    color={'#F7B801'}
                                    titleStyle={{fontSize: 20}}
                                />
                            </View>)}
                            <View style={styles.logoutButton}>
                                <RaisedTextButton
                                    title={'Sign out'}
                                    onPress={this.logout}
                                />
                            </View>
                        </View>
                         {/*<AnimalList title="tiger"/>*/}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {
                        this.camera = ref;
                    }}>
                        <View style={{flex:1, flexDirection:"row",justifyContent:"flex-start",marginTop:40, marginLeft:20}}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-start',
                                    alignItems: 'flex-start',
                                    backgroundColor: 'transparent',
                                }} onPress={this.closeCamera}>
                                <AntDesign name="close" size={40} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }} onPress={this.openImagePickerAsync}>
                                <Ionicons
                                    name="ios-photos"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }} onPress={()=>this.takePicture()}>
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }} onPress={()=>this.handleCameraType()}>
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectFileButton: {
        width: '100%',
        margin: 5,
        padding: 10
    },
    logoutButton: {
        width: '100%',
        margin: 5,
        padding: 10
    },
    imageContainer: {
        width: 350,
        height: 350,
        alignItems: "center",
        justifyContent: "center"
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    actionBar: {
        backgroundColor: '#FFFFFF'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        color: '#AD9A89',
        letterSpacing: 3
    },
});

export default Home;