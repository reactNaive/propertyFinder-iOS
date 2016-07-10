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

const ZERO = 0.000000001;
const ICRSSURL = 'www3.imperial.ac.uk/newsapp/feed/college/news/';
import FeedView from './FeedDetail';

import Josnnnn from './property.json';
import SearchBar from 'react-native-search-bar';

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');
//import Drawer from 'react-native-drawer'

import Icon from 'react-native-vector-icons/MaterialIcons';

const SUZHOU = ["姑苏区","虎丘区","吴中区","相城区","吴江区","工业园区","常熟市","张家港市","昆山市","太仓市"];
const PRICE = ["500以下", "500-800", "800-1000", "1000-1500", "1500-2000","2000-3000","3000-5000","5000以上"];
const HOUSETYPE = ["不限","一室","两室","三室","四室以上"];
const ORDER = ["租金从低到高","租金从高到低"];

function convert(input){
    return input*width/320;
}

const drawerStyles = StyleSheet.create({
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
})
//
// export default class drawer extends Component {
//
//     render() {
//         return (
//             <Drawer
//                 type="static"
//                 content={<View />}
//                 openDrawerOffset={100}
//                 styles={drawerStyles}
//                 tweenHandler={Drawer.tweenPresets.parallax}
//             >
//                 <Main />
//             </Drawer>
//
//         )
//     }
// }

export default class home extends Component {



    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.title !== r2.title});
        this.state = {
            entries: [],
            dataSource: dataSource,
            dataSource2: dataSource,
            result: false,
            flex: ZERO,
            tabName: "区域",
            city: "苏州",
            tabColors: ['white','#EAEAEA','#EAEAEA','#EAEAEA'],
            fadeAnim: new Animated.Value(0), // init opacity 0
        };
    }

    componentDidMount() {
        //this.refs.searchBar.focus();

        this.fetchData(ICRSSURL);

    }

    fetchData(query) {
        console.log(query);
        if (!(/^http:\/\//.test(query))) {
            query = "http://" + query;
        }

        var GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q="
        var query = GOOGLE_FEED_API_URL + encodeURIComponent(query);
        console.log("hello123");
        console.log(this.state.dataSource.cloneWithRows(Josnnnn.house.filter(item=>item.name=="aaa")));

        fetch(query)
            .then((response) => response.json())
            .then((json) => {
                //console.log(json);

                this.setState({
                    entries: json.responseData.feed.entries,
                    dataSource: this.state.dataSource.cloneWithRows(Josnnnn.house),
                    dataSource2: this.state.dataSource.cloneWithRows(Josnnnn.house.filter(item=>item.score==1)),
                    loaded: true,
                });
            })
            .done();

    }

    rowPressed(rowData) {
        let UID123_object = {
            height: 0,
            paddingBottom: 0,
            overflow: 'hidden'
        };
        AsyncStorage.mergeItem('hide', JSON.stringify(UID123_object));
        //var entry = this.state.entries.filter(prop => prop.title === rowTitle)[0];
        //console.log(rowData.name);
        this.props.nav.navigator.push({
            title: rowData.name,
            titleTextColor: 'white',
            barTintColor: '#19CAB6',
            tintColor: 'white',
            //leftButtonTitle: '',
            //navigationBarHidden: 'true',
            //translucent: 'true',
            component: FeedView,
            passProps: {data: rowData}
        });
        this.refs.searchBar.blur();
    }

    _search() {
        if (this.state.searchContent === '') {
            return AlertIOS.alert(
                '内容不能为空'
            );
        }
        this.refs.searchBar.blur();
        var that = this;
        this.setState({loaded: false,
            result: true,
        });
        var errLog = function (err) {
            console.log(err.message);
        };
    }

    _showresult(){

        // return <ListView //style={{borderWidth: 2}}
        //                  dataSource={this.state.dataSource}
        //                  renderRow={this.renderRow.bind(this)}
        // />
        //
        console.log("hello");
        if(this.state.result===false){
            return <ListView style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        } else {
            return <ListView style={{flex: 1}}
                dataSource={this.state.dataSource2}
                renderRow={this.renderRow.bind(this)}
                keyboardDismissMode='interactive'
                keyboardShouldPersistTaps={true}
            />
        }
    }

    filter() {
        this.refs.searchBar.blur();
        if(this.state.flex === ZERO) {
            this.setState({flex: 0.6});
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {toValue: 1}            // Configuration
            ).start();                // Don't forget start!
        } else {
            this.setState({flex: ZERO});
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {toValue: 0}            // Configuration
            ).start();                // Don't forget start!
        }
    }

    renderRow(rowData, sectionID, rowID) {

        var top=0;
        if(rowID == 0) {
            top = -20;
        }
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData)}
                                underlayColor='#dddddd'

            >
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: "http://gatehouse-elite.com/wp-content/gallery/sundance-ridge-luxury-real-estate-for-sale-on-st-kitts-the-suncatcher-villa/new-luxury-real-estate-for-sale-on-sundance-ridge-saint-kitts-ocean-views-carribean-property.jpg" }} />
                        <View  style={styles.textContainer}>
                            <View style={styles.rowContainer2}>
                                <Text style={styles.title}
                                      numberOfLines={2}>{rowData.name}</Text>
                                <Text style={styles.price} numberOfLines={1}>{rowData.price}万</Text>
                            </View>
                            <Text style={styles.type} numberOfLines={1}>{rowData.type} {rowData.area}平米</Text>
                            <Text style={styles.adv} numberOfLines={1}>{rowData.adv}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
        
    }

    renderFilterTab(tabName){

        return(
        <TouchableHighlight
            style={[styles.tab,{backgroundColor: this.state.tabColors[this.getNum(tabName)]}]}
            onPress={() => this.selection(tabName)}
            underlayColor='white'
        >
            <Text style={styles.tabText}>{tabName}</Text>
        </TouchableHighlight>
        );
    }

    getNum(tabName) {
        switch(tabName) {
            case "区域":
                return 0;
            case "价格":
                return 1;
            case "房型":
                return 2;
            case "排序":
                return 3;
        }
    }

    selection(tabName) {
        var list = ['#EAEAEA','#EAEAEA','#EAEAEA','#EAEAEA'];
        list[this.getNum(tabName)] = 'white';
        this.setState({
            tabName: tabName,
            tabColors: list,
        });
    }

    renderSelection() {
        switch(this.state.tabName) {
            case "区域":
                return this.tabs(SUZHOU);
            case "价格":
                return this.tabs(PRICE);
            case "房型":
                return this.tabs(HOUSETYPE);
            case "排序":
                return this.tabs(ORDER);
        }
    }

    tabs(a) {
        var list = [];
        for (e in a) {
            list.push(<TouchableHighlight
                key={e}
                style={[styles.tab, {borderBottomWidth: 0.5, borderBottomColor: 'lightgrey'}]}
                onPress={() => this.selectFilter()}
                underlayColor='#EAEAEA'
            >
                <Text style={styles.tabText}>
                    {a[e]}
                </Text>
            </TouchableHighlight>);
        }
        return list;
    }

    selectFilter() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#19CAB6', height: 20}}/>
                <View style={styles.row}>
                    <View style={styles.search}>

                        <SearchBar
                            ref='searchBar'
                            placeholder='Search'
                            onChange={(event) => this.setState({searchContent: event.nativeEvent.text})}
                            onSearchButtonPress={() => this._search()}
                            barTintColor='#19CAB6'
                        />
                    </View>
                    <TouchableOpacity style={styles.cube} onPress={() => this.filter()}>
                        <Icon name='tune' size={25} color='white'/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView style={{flex: ZERO}} />
                    <Animated.View style={[styles.filter,{flex: this.state.flex, opacity: this.state.fadeAnim}]}>
                        <ScrollView style={{flex: 2, backgroundColor: '#EAEAEA'}}>
                            {this.renderFilterTab('区域')}
                            {this.renderFilterTab('价格')}
                            {this.renderFilterTab('房型')}
                            {this.renderFilterTab('排序')}
                        </ScrollView>
                        <ScrollView style={{flex: 3}}>
                            {this.renderSelection()}
                        </ScrollView>
                    </Animated.View>

                        {this._showresult()}
                </View>
                {StatusBar.setBarStyle("light-content")}
            </View>
        )
    }

}



var styles = StyleSheet.create({
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
        fontWeight: 'bold',
        //color: '#48BBEC'
        color: 'black',
        //right:-100,
        //marginRight: 0,
        fontStyle: 'italic',
        textAlign: 'right',
    },
    type: {
      lineHeight: 20
    },
    adv: {
        lineHeight: 20
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
        //marginTop: 20,
        width: width/8*7
    },

    row: {
        flexDirection: 'row',

    },

    cube: {
        flex: 1,
        //marginTop: 20,
        backgroundColor: '#19CAB6',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor:"blue",
        //borderWidth: 1,
    },
    filter: {
        flexDirection: 'row',shadowColor: 'black',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    tab: {
        height: height/14*3/4,
        justifyContent: 'center',
    },
    tabText: {
        paddingLeft: 15,
        fontSize: 15,
    }
});





//                                <Text style={styles.price} numberOfLines={4}>{rowData.unit_price}</Text>

