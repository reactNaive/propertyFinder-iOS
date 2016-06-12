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

import TabNavigator from 'react-native-tab-navigator';

const ICRSSURL = 'www3.imperial.ac.uk/newsapp/feed/college/news/';
import FeedView from './FeedDetail';

import Josnnnn from './property.json';


export default class home extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.title !== r2.title});
        this.state = {
            entries: [],
            dataSource: dataSource
        };
    }

    componentDidMount() {
        this.fetchData(ICRSSURL);
    }

    fetchData(query) {
        console.log(query);
        if (!(/^http:\/\//.test(query))) {
            query = "http://" + query;
        }

        var GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q="
        var query = GOOGLE_FEED_API_URL + encodeURIComponent(query);

        fetch(query)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    entries: json.responseData.feed.entries,
                    dataSource: this.state.dataSource.cloneWithRows(Josnnnn.house),
                    loaded: true,
                });
            })
            .done();

    }

    rowPressed(rowTitle) {
        var entry = this.state.entries.filter(prop => prop.title === rowTitle)[0];
        //LinkingIOS.openURL(property.link)
        this.props.navigator.push({
            title: "Detail",
            titleTextColor: 'white',
            barTintColor: '#003E74',
            tintColor: 'white',
            component: FeedView,
            passProps: {entry: entry}
        });
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
                                <Text style={styles.price} numberOfLines={3}>{rowData.price}万</Text>
                            </View>
                            <Text style={styles.type} numberOfLines={5}>{rowData.type} {rowData.area}平米</Text>
                            <Text style={styles.adv} numberOfLines={7}>{rowData.adv}</Text>


                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
            //<View style={styles.separator}/>
        );
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
        padding: 10
    },
    rowContainer2: {
        flexDirection: 'row',


    },
    container: {
        flex: 1,
    }
});





//                                <Text style={styles.price} numberOfLines={4}>{rowData.unit_price}</Text>
