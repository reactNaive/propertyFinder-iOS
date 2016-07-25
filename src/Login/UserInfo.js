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
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.name}</Text>
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

});