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
} from 'react-native';

import Icon_i from 'react-native-vector-icons/Ionicons';
import Login from './login.index';
// var Feedback = require('../QA/Q_A');
// var IC_Tour = require('./IC_Tour');
// var About_Us = require('./About_Us');

//var huxley = require('./huxley');
//var queen = require('./queen');

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

    _onPress(_child, flag) {
        //console.log(_child);
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
    renderRow(_iconname, _rowname, _childview) {
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this._onPress(_childview, 0)}
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
                        onPress={() => this._onPress(Login, 1)}
                        underlayColor='#dddddd'
                    >

                        <Image
                            style={styles.img}
                            source={require('../img/blank.gif')}
                        />
                        <Text style={styles.text1}>点击登录</Text>
                    </TouchableOpacity>
                </View>
                {this.renderRow('ios-checkmark', 'kkkkk', empty)}
                {this.renderRow('ios-checkmark', 'aaaaa', empty)}
                {this.renderRow('ios-checkmark', 'bbbbb', empty)}
                {this.renderRow('ios-checkmark', 'ccccc', empty)}
                {this.renderRow('ios-checkmark', 'ddddd', empty)}
                {this.renderRow('ios-checkmark', 'eeeee', empty)}
                {this.renderRow('ios-checkmark', 'fffff', empty)}
                {this.renderRow('ios-checkmark', 'rrrrr', empty)}
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
        flex: 2.5,
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
        flex: 1,
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

