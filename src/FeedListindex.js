import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    NavigatorIOS,
} from 'react-native';


import Feed from './FeedList';

export default class FeedListindex extends Component {
    render() {
        return (

                <NavigatorIOS
                    style={styles.container}
                    initialRoute={{
            title: '推荐',
            barTintColor: 'white',
            titleTextColor: 'black',
            component: Feed,
          }}/>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
