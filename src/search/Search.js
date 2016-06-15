import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    NavigatorIOS,

    TouchableOpacity,
    TextInput,
    AlertIOS,
    ActivityIndicatorIOS,

    ScrollView,


} from 'react-native';

import Josnnnn from '../property.json';

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

function convert(input){
    return input*width/320;
}


import PropertyTypePicker from '../components/PropertyTypePicker.js';
import globalVariables from '../globalVariables.js';

import SearchBar from 'react-native-search-bar';
import Drawer from 'react-native-drawer'
//import ControlPanel from './ControlPanel'
//import Main from './Main'
//
//
//var DropView = require('./DropdownView');
//var dropdownMenus = require('./DropdownViewConfig');
//
//const dropMenus = [dropdownMenus.platform, dropdownMenus.date,];
//



export default class search extends Component {

    state={
        drawerOpen: false,
        drawerDisabled: false,
    };
    closeDrawer = () => {
        this._drawer.close()
    };
    openDrawer = () => {
        this._drawer.open()
    };

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.title !== r2.title});
        this.state = {
            loaded: true,
            selectItem: '用户',
            searchPage: 1,
            searchContent: '',
            searchResult: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            result: false,

            dataSource: dataSource,

            propertyType: 'DETACHD',


        };
    }



    componentDidMount() {
        this.refs.searchBar.focus();

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(Josnnnn.house),
        });
    }



    render() {
        return (




            <View style={styles.container}>



                <View style={styles.row}>
                    <View style={styles.search}>

                        <SearchBar
                            ref='searchBar'
                            placeholder='Search'
                            onChange={(event) => this.setState({searchContent: event.nativeEvent.text})}
                            onSearchButtonPress={() => this._search()}

                        />
                    </View>
                    <View style={styles.cube}>

                    </View>
                </View>







                {this._showresult()}

            </View>




        );
    }

    saveQueryOptions(key, value) {
        //console.log('saveQueryOptions', key, value);
        const temp = {};
        temp[key] = value;
        this.setState(temp);
    }


    _search() {
        if (this.state.searchContent === '') {
            return AlertIOS.alert(
                '内容不能为空'
            );
        }
        var that = this;
        this.setState({loaded: false,
            result: true,
        });
        var errLog = function (err) {
            console.log(err.message);
        };
        console.log("hello");
        console.log(this.state.result);
        
    }
    _showresult(){

        console.log("hello");
        if(this.state.result===false){
            return
        }
        return <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}/>



    }


    renderRow(rowData, sectionID, rowID) {

        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.name)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: "http://gatehouse-elite.com/wp-content/gallery/sundance-ridge-luxury-real-estate-for-sale-on-st-kitts-the-suncatcher-villa/new-luxury-real-estate-for-sale-on-sundance-ridge-saint-kitts-ocean-views-carribean-property.jpg" }} />
                        <View  style={styles.textContainer}>
                            <View style={styles.rowContainer2}>
                                <Text style={styles.title}
                                      numberOfLines={2}>{rowData.name}</Text>
                                <Text style={styles.price} numberOfLines={2}>{rowData.price}万</Text>
                            </View>
                            <Text style={styles.type} numberOfLines={2}>{rowData.type} {rowData.area}平米</Text>
                            <Text style={styles.adv} numberOfLines={2}>{rowData.adv}</Text>


                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }




}
const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 60,
        marginRight: 10
    },
    textContainer: {
        flex: 1,

    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        flex:1,
        fontSize: 15,
        //color: '#48BBEC'
        color: 'red',
        //right:-100,
        //marginRight: 0,

        textAlign: 'right',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        //textAlign: 'right',

    },
    rowContainer: {
        flexDirection: 'row',
        padding: convert(10),
    },
    rowContainer2: {
        flexDirection: 'row',


    },
    container: {
        flex: 1,
    },

    search: {
        marginTop: 20,
        width: width/8*7
    },

    row: {
        flexDirection: 'row',

    },

    cube: {
        flex: 1,
        marginTop: 20,

        borderColor:"blue",
        borderWidth: 1,
    },





    logo: {
        width: 40,
        height: 26,
        marginRight: 10
    },
    searchText: {
        height: 26,
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#2a2',
        padding: 4,
        fontSize: 13
    },
    searchLine: {
        height: 26,
        flexDirection: 'row',
        marginTop: 30,
        //marginBottom: 6,

        borderColor:"red",
        borderWidth: 1,

    },
    searchButton: {
        height: 26,
        backgroundColor: '#2a2',
        padding: 3
    },
    selectButton: {
        height: 30,
        flex: 1,
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

/*
 <View style={styles.searchLine}>
 <TextInput
 onChange={(event) => this.setState({searchContent: event.nativeEvent.text})}
 style={styles.searchText}/>
 <TouchableOpacity onPress={this._search.bind(this)}>
 <View style={styles.searchButton}>
 <Text style={{color: '#fff', lineHeight: 16}}>搜索</Text>
 </View>
 </TouchableOpacity>
 </View>





 <View style={styles.container}>



 <View style={styles.row}>
 <View style={styles.search}>

 <SearchBar
 ref='searchBar'
 placeholder='Search'
 onChange={(event) => this.setState({searchContent: event.nativeEvent.text})}
 onSearchButtonPress={() => this._search()}

 />
 </View>
 <View style={styles.cube}>

 </View>
 </View>






 <PropertyTypePicker value={this.state.propertyType} onChange={() => this.saveQueryOptions()} />
 {this._showresult()}

 </View>

 */