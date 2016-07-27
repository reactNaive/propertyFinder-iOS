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

import UserInfo from './UserInfo';

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
        this.props.navigator.push({
            title: this.state.username,
            titleTextColor: 'white',
            barTintColor: '#19CAB6',
            navigationBarHidden: false,
            component: registerPage,
            // leftButtonTitle: 'Back',
            tintColor: 'white',
            // passProps: {name: this.state.username},
            // onLeftButtonPress: () => this.props.navigator.popN(2),
            // rightButtonIcon: require('image!NavBarButtonPlus'),
            //onRightButtonPress: this.props.navigator.popN(1),
            //navigationBarHidden: true,
        });
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
                if(responseJson.token) {
                    Global.token = responseJson.token;
                    Global.username = this.state.username;

                    Global.saved = responseJson.data.saved;
                    console.log(Global.saved);
                    Alert.alert("登录成功");
                    this.props.navigator.pop();
                }
                // console.log(this.props);

                // this.props.navigator.push({
                //     title: this.state.username,
                //     titleTextColor: 'white',
                //     barTintColor: '#19CAB6',
                //     navigationBarHidden: false,
                //     component: UserInfo,
                //     leftButtonTitle: '返回',
                //     tintColor: 'white',
                //     passProps: {data: responseJson.data},
                //     onLeftButtonPress: () => this.props.navigator.popN(2),
                //     // rightButtonIcon: require('image!NavBarButtonPlus'),
                //     //onRightButtonPress: this.props.navigator.popN(1),
                //     //navigationBarHidden: true,
                // });
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
                        onPress={this._login.bind(this)}>
                        <Text style={styles.buttonText}>登录</Text>
                    </TouchableHighlight>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text>还没有账号? 请点击 </Text>
                    <TouchableHighlight
                        onPress={this._register.bind(this)}>
                        <Text style={styles.buttonText2}>注册</Text>
                    </TouchableHighlight>
                </View>
                {StatusBar.setBarStyle("default")}
            </View>
        );
    }
}

class registerPage extends Component {
    constructor(props) {
        super(props);
        this.name = null;
        this.state = {
            username: '',
            password: '',
            rePass: '',
            phoneNum: '',
            mail: '',
            uid: '',
        };

    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        console.log(re.test(email));
        return re.test(email);
    }
    //create user
    _register() {
        if(this.state.password.length < 6) {
            Alert.alert("密码长度过短(6位或以上)");
            return;
        }
        if(this.state.password != this.state.rePass) {
            Alert.alert("密码不一致,请重新输入");
            return;
        }
        if(this.state.phoneNum.length != 11) {
            Alert.alert("手机号码格式有误");
            return;
        }
        if(!this.validateEmail(this.state.mail)) {
            Alert.alert("邮箱格式有误");
            return;
        }
        if(this.state.username && this.state.password && this.state.rePass && this.state.phoneNum && this.state.mail) {
            console.log(JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                phoneNum: this.state.phoneNum,
                mail: this.state.mail,
                saved: []
            }));
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    phoneNum: this.state.phoneNum,
                    mail: this.state.mail,
                    saved: []
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.response === 'post ok') {
                        this.props.navigator.pop();
                        Alert.alert("注册成功,请登录");
                    } else {
                        Alert.alert(responseJson.response);
                    }
                })
                .catch((error) => {
                    Alert.alert("出错啦!");
                    console.log(error);

                });
        } else {
            Alert.alert("请将信息填写完整");
        }

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

    onUserNameChanged(e) {
        this.setState({username: e});
    }

    onPassWordChanged(e) {
        this.setState({password: e});
    }

    onRePassWordChanged(e) {
        this.setState({rePass: e});
    }

    onPhoneChanged(e) {
        this.setState({phoneNum: e});
    }

    onMailChanged(e) {
        this.setState({mail: e});
    }

    render() {
        return (

            <View style={styles.ViewContainer}>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.username}
                        placeholder=' 输入用户名'
                        keyboardType= 'default'
                        onChangeText={e => this.onUserNameChanged(e)}/>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder=' 输入密码'
                        onChangeText={e => this.onPassWordChanged(e)}/>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.rePass}
                        secureTextEntry={true}

                        placeholder=' 再次输入密码'
                        onChangeText={e => this.onRePassWordChanged(e)}/>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.phoneNum}
                        placeholder=' 输入手机号'
                        onChangeText={e => this.onPhoneChanged(e)}/>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <TextInput
                        style={styles.box}
                        value={this.state.mail}
                        placeholder=' 输入邮箱'
                        onChangeText={e => this.onMailChanged(e)}/>
                </View>

                <View style={styles.separator2}/>

                <View style={styles.button_v}>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={this._register.bind(this)}>
                        <Text style={styles.buttonText}>注册</Text>
                    </TouchableHighlight>
                </View>

                {StatusBar.setBarStyle("light-content")}
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        marginTop: 64,
        flex: 1
    },
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
    },
    buttonText2: {
        // fontSize: 12,
        color: '#19CAB6',
        alignSelf: 'center',
        fontWeight: 'bold',
        // borderWidth: 1,
        // borderColor: 'red',
    }

});

/*
 <TouchableHighlight
 style={styles.button}
 underlayColor='#99d9f4'
 onPress={this._register.bind(this)}>
 <Text style={styles.buttonText}>注册</Text>
 </TouchableHighlight>
 <View style = {{flex: 2}}/>
 */