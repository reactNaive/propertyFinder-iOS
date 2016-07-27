import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    Text,
    NavigatorIOS,
    AsyncStorage,
    Picker,
    ScrollView,
    StatusBar,
    Animated,
} from 'react-native';
import Global from '../Global';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

export default class UserInfo extends Component {
    renderSaved() {
        var str = "id:(";
        if(Global.saved[0]) {
            Global.saved.map(e => str = str + e + " ");
            str = str.slice(0, -1);
            str = str + ")";
            console.log(str);
        }
        var url= Global.searchURL+"&q="+str;
        this.fetch_solr(url);
        console.log("fetch ",url);
        // Global.saved.map(e => e.)
    }
    fetch_solr(solr_query){

        fetch(solr_query)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    solr_json: json.response.docs,
                    dataSource:this.state.dataSource.cloneWithRows(json.response.docs)
                });
                // console.log("json.response");
                // console.log(json.response.docs);
            })
            .catch(function(error) {
                console.log('request failed', error)
            });
    }


    render() {
        return (
            <View style={styles.ViewContainer}>
                <TouchableOpacity style={styles.arrow}
                                  onPress={()=>this.props.navigator.pop()}>

                </TouchableOpacity>
                <Image
                    style={styles.img}
                    source={require('../img/react.png')}
                />

                <View style={styles.separator2}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch'}}>
                    <Text style={styles.box}>
                        用户名: {this.props.data.username}
                    </Text>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.box}>
                        邮箱: {this.props.data.mail}

                    </Text>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.box}>
                        手机: {this.props.data.phoneNum}

                    </Text>
                </View>

                <View style={styles.separator1}/>

                <View style={{ borderBottomColor: '#19CAB6', borderBottomWidth: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.box}>
                        你的收藏: {Global.saved.length}
                    </Text>
                </View>

                <View style={styles.separator1}/>
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
        height: 10,
        // borderWidth: 1,
        // borderColor: 'red',
    },

    separator2: {
        height: 30,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    box: {
        height: 20,
        fontSize: 15,
        flex: 1,
        paddingLeft: 15,
        // alignSelf: 'center',
        justifyContent: 'flex-end',
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
    },
    text: {
        fontSize: 12,
        color: '#19CAB6',
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        // borderWidth: 1,
        // borderColor: 'red',
    }

});