'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    NavigatorIOS,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Alert,
    StatusBar,
} from 'react-native';
import Global from '../Global';

import base64 from 'base-64';

import Icon from 'react-native-vector-icons/Ionicons';

var { width, height } = Dimensions.get('window');

const url = Global.url+"users";

export default class loginPage extends Component {

    constructor(props) {
        super(props);
        this.name = null;
        this.state = {
            username: '',
            password: '',
            uid: '',
        };
    }

    //create user
    _register() {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                saved: []
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                Alert.alert("注册成功,请登录");
            })
            .catch((error) => {
                console.log(error);
            });
        // var ref = new Firebase('https://ic-tour-test.firebaseio.com');
        // ref.createUser({
        //     email    : this.state.username,
        //     password : this.state.password
        // }, (error, userData) => {
        //     if (error) {
        //         console.log("Error creating user:", error);
        //     } else {
        //         console.log("Successfully created user account with uid:", userData.id);
        //     }
        // });
    }



    //logging users in
    _login() {
        //const hash = new Buffer(`${this.state.username}:${this.state.password}`).toString('base64')
        fetch(url+"/"+this.state.username, {
            method: 'get',
            headers: {
                'Authorization': 'Basic '+base64.encode(`${this.state.username}:${this.state.password}`),
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                Global.token = responseJson.token;
                Global.username = this.state.username;
                this.props.navigator.push({
                    title: '信息',
                    titleTextColor: 'white',
                    barTintColor: '#19CAB6',
                    navigationBarHidden: false,
                    component: UserInfo,
                    //rightButtonTitle: 'Go Inside',
                    tintColor: 'white',
                    //rightButtonIcon: require('image!NavBarButtonPlus'),
                    onRightButtonPress: () => this.navigator.popN(3) ,
                    //navigationBarHidden: true,
                });
            })
            .catch((error) => {
                Alert.alert("用户名或密码错误");
                console.log(error);
            });
    }

    onUserNameChanged(e) {
        this.setState({username: e});
    }

    onPassWordChanged(e) {
        this.setState({password: e});
    }

    render() {
        return (

            <View style={styles.ViewContainer}>
                <TouchableOpacity style={styles.arrow}
                                  onPress={()=>this.props.navigator.pop()}>
                    <Icon name='md-arrow-back'
                          size={25}
                          color="#19CAB6"/>
                </TouchableOpacity>
                <Image
                    style={styles.img}
                    source={require('../img/react.png')}
                />

                <View style={styles.separator2}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.username}
                        placeholder=' Username'
                        keyboardType= 'default'
                        onChangeText={e => this.onUserNameChanged(e)}/>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder=' Password'
                        onChangeText={e => this.onPassWordChanged(e)}/>
                </View>

                <View style={styles.separator2}/>

                <View style={styles.button_v}>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={this._register.bind(this)}>
                        <Text style={styles.buttonText}>注册</Text>
                    </TouchableHighlight>
                    <View style = {{flex: 2}}/>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={this._login.bind(this)}>
                        <Text style={styles.buttonText}>登录</Text>
                    </TouchableHighlight>
                </View>
                {StatusBar.setBarStyle("default")}
            </View>
        );
    }
}

class UserInfo extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={() => this.props.navigator.pop()}>
                {StatusBar.setBarStyle("light-content")}
            </TouchableOpacity>

    );
    }
}

const styles = StyleSheet.create({

    arrow: {
        width: 25,
        height: 30,
        // borderWidth: 1,
        // borderColor: 'red',
        top: 40*width/320,
        position: 'absolute',
        alignSelf: 'flex-start',
    },

    img: {
        width: 50,
        height: 50,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    ViewContainer: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'relative'
        // borderWidth: 1,
        // borderColor: 'red',
    },
    separator1: {
        height: 5,
        // borderWidth: 1,
        // borderColor: 'red',
    },

    separator2: {
        height: 30,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    box: {
        height: 36,
        fontSize: 18,
        // borderWidth: 1,
        // borderColor: '#19CAB6',
    },
    button_v: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    button: {
        flex: 49,
        height: 36,
        //width: width/6,
        //backgroundColor: '#19CAB6',
        borderColor: '#19CAB6',
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 12,
        color: '#19CAB6',
        alignSelf: 'center',
        fontWeight: 'bold',
        // borderWidth: 1,
        // borderColor: 'red',
    }

});