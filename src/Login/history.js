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
import FeedView from '../FeedDetail';

//import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/MaterialIcons';

const url = Global.url+"token";

function convert(input){
    return input*width/320;
}

export default class home extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            entries: [],
            dataSource: dataSource,
            dataSource2: dataSource,

            newdataSource: [],
            solr_json:[],

            solr_url:"http://54.171.189.58:8983/solr/gettingstarted/select?indent=on&q=*:*&wt=json",

            solr_url_1:"http://54.171.189.58:8983/solr/gettingstarted/select?indent=on&wt=json",
            solr_url_2_search:"&q=*:*",
            solr_url_3_fq_sort: "",
            result: false,
            empty: false,
        };
        // if(Global.username) {
        //     fetch(url + "/" + Global.username, {
        //         method: 'get',
        //         headers: {
        //             'Authorization': 'Token ' + Global.token,
        //         },
        //     })
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             Global.saved = responseJson.saved;
        //             console.log(responseJson);
        //             // alert("User Info");
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // }

    }

    judgeTab() {
        var str = "id:(";
        switch(this.props.tab) {
            case "saved":
                if(Global.saved[0]) {
                    Global.saved.map(e => str = str + e + " ");
                    str = str.slice(0, -1);
                    str = str + ")";
                    console.log(str);
                }
                return str;
            case "history":
                if(Global.history[0]) {
                    Global.history.map(e => str = str + e + " ");
                    str = str.slice(0, -1);
                    str = str + ")";
                    console.log(str);
                }
                return str;
        }
    }

    componentDidMount(){
        var str = this.judgeTab();
        if(Global.saved[0] || Global.history[0]) {
            var url= Global.searchURL+"&q="+str;
            this.fetch_solr(url);
            console.log("fetch ",url);
        } else {
            this.setState({empty: true});
        }
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

    rowPressed(rowData) {

        console.log("rowData");
        console.log(rowData);
        // console.log(Global.history.indexOf(rowData.id));

        // let UID123_object = {
        //     height: 0,
        //     paddingBottom: 0,
        //     overflow: 'hidden'
        // };
        // AsyncStorage.mergeItem('hide', JSON.stringify(UID123_object));
        //var entry = this.state.entries.filter(prop => prop.title === rowTitle)[0];
        //console.log(rowData.name);
        this.props.navigator.push({
            title: rowData.name[0],
            titleTextColor: 'white',
            barTintColor: '#19CAB6',
            tintColor: 'white',
            //leftButtonTitle: '',
            //navigationBarHidden: 'true',
            //translucent: 'true',
            component: FeedView,
            passProps: {data: rowData}
        });
    }


    _showresult(){

        // return <ListView //style={{borderWidth: 2}}
        //                  dataSource={this.state.dataSource}
        //                  renderRow={this.renderRow.bind(this)}
        // />
        //

        //console.log(this.state.newdataSource);
        //console.log([a:1,b:2,c:3].filter(a=>a===1));
        // console.log(this.state.newdataSource.filter(item => item.wc==='1'));
        //
        // var temp=this.state.newdataSource.filter(item => item.wc==='1');



        //console.log(temp);


        //this.state.dataSource.cloneWithRows(

        // this.fetchData();


        return (<ListView style={{flex: 1}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
        />);
        // if(this.state.result===false){
        //     return <ListView style={{flex: 1}}
        //                      dataSource={this.state.dataSource}
        //                      renderRow={this.renderRow.bind(this)}
        //     />
        // } else {
        //     return <ListView style={{flex: 1}}
        //                      dataSource={this.state.dataSource2}
        //                      renderRow={this.renderRow.bind(this)}
        //                      keyboardDismissMode='interactive'
        //                      keyboardShouldPersistTaps={true}
        //     />
        // }

    }

    renderRow(rowData, sectionID, rowID) {


        // console.log("rowData123");
        // console.log(rowData);
        // var top=0;
        // if(rowID == 0) {
        //     top = -20;
        // }
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData)}
                                underlayColor='#dddddd'
                                key={Math.random()}

            >
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: "http://gatehouse-elite.com/wp-content/gallery/sundance-ridge-luxury-real-estate-for-sale-on-st-kitts-the-suncatcher-villa/new-luxury-real-estate-for-sale-on-sundance-ridge-saint-kitts-ocean-views-carribean-property.jpg" }} />
                        <View  style={styles.textContainer}>
                            <View style={styles.rowContainer2}>
                                <Text style={styles.title}
                                      numberOfLines={2}>{rowData.name}</Text>
                                <Text style={styles.price} numberOfLines={1}>{rowData.price_1}</Text>
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

    // componentWillReceiveProps( nextProps ) {
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows( nextProps.data )
    //     });
    // }

    tabname() {
        if(this.props.tab === "history") {
            return "历史记录";
        } else {
            return "收藏记录";
        }
    }

    render() {
        if(this.state.empty) {
            return (
                <View style={styles.containerE}>
                    <Text>没有{this.tabname()}</Text>
                    {StatusBar.setBarStyle("light-content")}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>

                    <ListView style={{flex: 1}}
                              dataSource={this.state.dataSource}
                              renderRow={this.renderRow.bind(this)}
                    >
                    </ListView>
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
    containerE: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
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

