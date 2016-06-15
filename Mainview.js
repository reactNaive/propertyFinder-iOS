import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    AsyncStorage,
    NavigatorIOS,
    Text,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Myhome from './src/FeedList';
import Myperson from './src/Login/person';
import Icon_i from 'react-native-vector-icons/Ionicons';


//var Mymap = require('./src/places/map');
//var MyIndoormap = require('./src/places/huxley_in');
//var Myfeed = require('./src/NewsFeed/FeedListView.index');
//var Mylogin = require('./src/Login/person');



const HOME = 'md-home';
const HOME_NORMAL = <Icon_i name='md-home' size={25} color="#BBBBBB"/>;
const HOME_FOCUS = <Icon_i name='md-home' size={25} color="#19CAB6"/>;

const SEARCH = 'ios-search';
const SEARCH_NORMAL = <Icon_i name='ios-search' size={25} color="#BBBBBB"/>;
const SEARCH_FOCUS = <Icon_i name='ios-search' size={25} color="#19CAB6"/>;

const PERSON = 'ios-person';
const PERSON_NORMAL = <Icon_i name='md-person' size={25} color="#BBBBBB"/>;
const PERSON_FOCUS = <Icon_i name='md-person' size={25} color="#19CAB6"/>;




export default class Mainview extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: '',
            barTintColor: 'white',
            navigationBarHidden: true,
            titleTextColor: 'black',
            component: Tabbar,
          }}/>

        );
    }
}



class Tabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME};
        let UID123_object = {
            height: 52,
            paddingBottom: 52,
            overflow: 'visible',
        };
        AsyncStorage.setItem('hide', JSON.stringify(UID123_object));
    }

    _renderTabItem(icon, selectedIcon, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => icon}//<Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => selectedIcon}
                //badgeText='1'
                //renderBadge={() => <CustomBadgeView />}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <Myhome nav={this.props}/>)}

                    {this._renderTabItem(PERSON_NORMAL, PERSON_FOCUS, PERSON, <Myperson nav={this.props}/>)}
                </TabNavigator>
                {StatusBar.setBarStyle("light-content")}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //marginTop: -20,
        flex: 1,
    },
    tab: {
        height: 52,
        backgroundColor: 'white',//'#19CAB6',
        shadowColor: 'black',
        shadowOffset: { height: -2, width: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        //alignItems: 'center'
    }
});
