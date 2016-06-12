import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Myhome from './src/FeedListindex';



var Icon_i = require('react-native-vector-icons/Ionicons');

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
const PERSON_NORMAL = <Icon_i name='ios-person' size={30} color="#BBBBBB"/>;
const PERSON_FOCUS = <Icon_i name='ios-person' size={30} color="#19CAB6"/>;



export default class Mainview extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME}
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
                    {/*tabBarStyle={{ height: 0, overflow: 'hidden' }}*/}
                    {/*sceneStyle={{ paddingBottom: 0 }}>*/}
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <Myhome/>)}

                    {this._renderTabItem(SEARCH_NORMAL, SEARCH_FOCUS, SEARCH, <View/>)}

                    {this._renderTabItem(PERSON_NORMAL, PERSON_FOCUS, PERSON, <View/>)}
                </TabNavigator>
                {StatusBar.setBarStyle("default")}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
