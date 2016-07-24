'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    NavigatorIOS,
    StatusBar,
    Alert,
} from 'react-native';
import Global from '../Global';


import Icon_i from 'react-native-vector-icons/Ionicons';
import Login from './login.index';

// var Feedback = require('../QA/Q_A');
// var IC_Tour = require('./IC_Tour');
// var About_Us = require('./About_Us');

//var huxley = require('./huxley');
//var queen = require('./queen');

const url = Global.url+"token";


var { width, height } = Dimensions.get('window');


// class person extends Component {
//     render() {
//         return (
//             <NavigatorIOS
//                 navigationBarHidden={true}
//                 style={{flex:1}}
//                 initialRoute={{
//             	title: 'Person',
//             	barTintColor: '#19CAB6',
//             	titleTextColor: 'white',
//             	component: content,
//        	}}/>
//         );
//     }
// }

export default class person extends Component {
    _onPressLogin(_child, flag) {
        //console.log(_child);
        if(Global.username) {
            // console.log(Global.token);
            fetch(url + "/" + Global.username, {
                method: 'get',
                headers: {
                    'Authorization': 'Token ' + Global.token,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // Global.token = responseJson.token;
                    console.log(responseJson);
                    alert("User Info");
                })
                .catch((error) => {
                    this.props.nav.navigator.push({
                        title: 'Login',
                        titleTextColor: 'white',
                        barTintColor: '#19CAB6',
                        navigationBarHidden: flag,
                        component: _child,
                        //rightButtonTitle: 'Go Inside',
                        tintColor: 'white',
                        //rightButtonIcon: require('image!NavBarButtonPlus'),
                        //onRightButtonPress: this.onRightButtonPress,
                        //navigationBarHidden: true,
                    });
                    console.error(error);
                });
        } else {
            this.props.nav.navigator.push({
                title: 'Login',
                titleTextColor: 'white',
                barTintColor: '#19CAB6',
                navigationBarHidden: flag,
                component: _child,
                //rightButtonTitle: 'Go Inside',
                tintColor: 'white',
                //rightButtonIcon: require('image!NavBarButtonPlus'),
                //onRightButtonPress: this.onRightButtonPress,
                //navigationBarHidden: true,
            });
        }
    }

    _onPress(_child, flag, _rowname) {
        if(_rowname === "我的收藏") {
            if(Global.username) {
                // console.log(Global.token);
                fetch(url + "/" + Global.username, {
                    method: 'get',
                    headers: {
                        'Authorization': 'Token ' + Global.token,
                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // Global.token = responseJson.token;
                        console.log(responseJson);
                        this.props.nav.navigator.push({
                            title: 'Login',
                            titleTextColor: 'white',
                            barTintColor: '#19CAB6',
                            navigationBarHidden: flag,
                            component: _child,
                            //rightButtonTitle: 'Go Inside',
                            tintColor: 'white',
                            //rightButtonIcon: require('image!NavBarButtonPlus'),
                            //onRightButtonPress: this.onRightButtonPress,
                            //navigationBarHidden: true,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Alert.alert("请登录","你尚未登录,或者你的登录已过期",
                            [
                                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: '确认', onPress: () => this.okPress()},
                            ]);
                    });
            } else {
                Alert.alert("请登录","你尚未登录,或者你的登录已过期",
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this.okPress()},
                    ]);
            }
        } else {
            this.props.nav.navigator.push({
                title: 'Login',
                titleTextColor: 'white',
                barTintColor: '#19CAB6',
                navigationBarHidden: flag,
                component: _child,
                //rightButtonTitle: 'Go Inside',
                tintColor: 'white',
                //rightButtonIcon: require('image!NavBarButtonPlus'),
                //onRightButtonPress: this.onRightButtonPress,
                //navigationBarHidden: true,
            });
        }
    }

    okPress() {
        this.props.nav.navigator.push({
            title: 'Login',
            titleTextColor: 'white',
            barTintColor: '#19CAB6',
            navigationBarHidden: 1,
            component: Login,
            //rightButtonTitle: 'Go Inside',
            tintColor: 'white',
            //rightButtonIcon: require('image!NavBarButtonPlus'),
            //onRightButtonPress: this.onRightButtonPress,
            //navigationBarHidden: true,
        });
    }

    name() {
        if(Global.username) {
            return Global.username;
        }
        return "点击登录"
    }
    renderRow(_iconname, _rowname, _childview) {
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this._onPress(_childview, 0, _rowname)}
                underlayColor='#dddddd'
            >
                <View style={styles.picv}>
                    <Icon_i name={_iconname} size={25} color="#006EAF"/>
                </View>
                <View style={styles.textv}>
                    <Text style={styles.text}>{_rowname}</Text>
                </View>
                <View style={styles.picv1}>
                    <Icon_i name='ios-arrow-forward' size={25} color="grey"/>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#19CAB6', height: 20}}/>
                <View style={styles.login}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._onPressLogin(Login, 1)}
                        underlayColor='#dddddd'
                    >

                        <Image
                            style={styles.img}
                            source={require('../img/blank.gif')}
                        />
                        <Text style={styles.text1}>{this.name()}</Text>
                    </TouchableOpacity>
                </View>
                {this.renderRow('ios-star-outline', '我的收藏', empty)}
                {this.renderRow('ios-time-outline', '历史记录', empty)}

                {StatusBar.setBarStyle("light-content")}
            </View>

        );
    }
}


class empty extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={() => this.props.navigator.pop()}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'red',
    },
    login: {
        //flex: 2.5,
        height: height/5,
        backgroundColor: '#19CAB6',
        // borderWidth: 1,
        // borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        // borderWidth: 1,
        // borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
        //alignSelf: 'center',
        //position: 'absolute',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    row: {
        //marginTop: 64,
        //flex: 1,
        //marginLeft: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
        height: height/13,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        //borderWidth: 1,
        //borderColor: 'red',
    },
    pic: {
        height: height/22,
        width: width/7,
        //borderWidth: 1,
    },
    picv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textv: {
        justifyContent: 'center',
        flex: 4,
    },
    picv1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 17,
    },
    text1: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 12,
    },
});

