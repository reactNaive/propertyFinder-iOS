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
import Global from './Global';


const ZERO = 0.000000001;
import FeedView from './FeedDetail';

import SearchBar from 'react-native-search-bar';

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');
//import Drawer from 'react-native-drawer'

import Icon from 'react-native-vector-icons/MaterialIcons';

const SUZHOU = ["不限","姑苏区","虎丘区","吴中区","相城区","吴江区","工业园区","常熟市","张家港市","昆山市","太仓市"];
const PRICE = ["不限","500以下", "500-800", "800-1000", "1000-1500", "1500-2000","2000-3000","3000-5000","5000以上"];
const HOUSETYPE = ["不限","一室","两室","三室","四室以上"];
const ORDER = ["不限","租金从低到高","租金从高到低"];

const url = Global.url+"token";

function convert(input){
    return input*width/320;
}

function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = parseInt(a[key]); var y = parseInt(b[key]);
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

// const drawerStyles = StyleSheet.create({
//     drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
//     main: {paddingLeft: 3},
// })


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
            flex: ZERO,
            tabName: "区域",
            tab2Name: "没有",
            city: "苏州",
            tabColors: ['white','#EAEAEA','#EAEAEA','#EAEAEA'],
            tabColors2: [[],[],[],[]],

            condition: ['不限','不限','不限','不限',],

            fadeAnim: new Animated.Value(0), // init opacity 0
        };
        if(Global.username) {
            fetch(url + "/" + Global.username, {
                method: 'get',
                headers: {
                    'Authorization': 'Token ' + Global.token,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    Global.saved = responseJson.saved;
                    console.log(responseJson);
                    // alert("User Info");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    componentWillMount() {
        //this.refs.searchBar.focus();

        //this.fetchData();
        //var solr_query = "http://54.171.189.58:8983/solr/gettingstarted/select?indent=on&q=*:*&wt=json";
        this.fetch_solr(this.state.solr_url);



    }
    componentDidMount(){

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
    fetchData() {
        var query = "http://54.171.189.58/";
        // console.log(this.state.dataSource.cloneWithRows(Josnnnn.house.filter(item=>item.name=="aaa")));
        fetch(query)
            .then((response) => response.json())
            .then((json) => {


                this.setState({
                    //entries: json.responseData.feed.entries,
                    dataSource: this.state.dataSource.cloneWithRows(json.response),
                    //dataSource2: this.state.dataSource.cloneWithRows(Josnnnn.house.filter(item=>item.score==1)),
                    newdataSource: sortJSON(json.response,"price", '123'),
                    loaded: true,
                });

                // this.setState({
                //     newdataSource: sortJSON(this.state.newdataSource,"price", '123'),
                // });


            })
            .catch(function(error) {
                console.log('request failed', error)
            });


    }

    rowPressed(rowData) {

        console.log("rowData");
        console.log(rowData);

        Global.history.push("id1");

        // let UID123_object = {
        //     height: 0,
        //     paddingBottom: 0,
        //     overflow: 'hidden'
        // };
       // AsyncStorage.mergeItem('hide', JSON.stringify(UID123_object));
        //var entry = this.state.entries.filter(prop => prop.title === rowTitle)[0];
        //console.log(rowData.name);
        this.props.nav.navigator.push({
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
        this.refs.searchBar.blur();
    }

    _search() {
        if (this.state.searchContent === '') {
            this.setState({
                solr_url_2_search:"&q=*:*"
            });
            // return AlertIOS.alert(
            //     '内容不能为空'
            // );
            //this.state.searchContent

        }
        else{
            this.state.solr_url_2_search="&q="+this.state.searchContent;
            this.setState({
                solr_url_2_search:this.state.solr_url_2_search
            });
        }

        this.state.solr_url=this.state.solr_url_1+this.state.solr_url_2_search+this.state.solr_url_3_fq_sort;
        this.setState({
            solr_url:this.state.solr_url
        });
        this.fetch_solr(this.state.solr_url);

        console.log("solr_url");
        console.log(this.state.solr_url);
        console.log("dataSource123");
        console.log(this.state.dataSource);


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

        console.log("tab1");
        console.log(this.state.tabName);


    }

    renderSelection() {
        switch(this.state.tabName) {
            case "区域":
                return this.tabs(SUZHOU,0);
            case "价格":
                return this.tabs(PRICE,1);
            case "房型":
                return this.tabs(HOUSETYPE,2);
            case "排序":
                return this.tabs(ORDER,3);
        }
    }

    tabs(a,menu) {
        var list = [];
        // for (e in a) {
        //     console.log("sss"+e+"  "+a[e]);

        var count=0;

        a.map((e) => {
            count=a.indexOf(e);
            //console.log("count123 "+this.state.tabColors2[menu][count]);

            list.push(<TouchableHighlight
                key={e}
                style={[styles.tab, {borderBottomWidth: 0.5,
            borderBottomColor: 'lightgrey', backgroundColor: this.state.tabColors2[menu][count]}]}
                onPress={() => this.selectFilter(e,a.length,a,menu)}
                underlayColor='#EAEAEA'
            >
                <Text style={styles.tabText}>
                    {e}
                </Text>
            </TouchableHighlight>);
        });

        return list;
    }



    selectFilter(e,array_length,a,menu) {

        var count = a.indexOf(e);


        var tabColors2=this.state.tabColors2;
        var list=[];
        for (var i=0;i<array_length;i++){
            list[i]='white';
        }
        // var list = ['#EAEAEA','#EAEAEA','#EAEAEA','#EAEAEA'];
        list[count] = '#EAEAEA';
        tabColors2[menu]= list;

        var condition=this.state.condition;
        condition[menu]=e;

        this.setState({
            tab2Name: e,
            tabColors2: tabColors2,
            condition: condition,
        });


        //solr change





        var price_low;
        var price_high;
        var no_price=true;

        switch(this.state.condition[1]){
            case "不限": no_price=true;
                break;
            case '500以下': price_low=0;
                price_high=500;
                no_price=false;
                break;
            case '500-800': price_low=500;
                price_high=800;
                no_price=false;
                break;
            case '800-1000': price_low=800;
                price_high=1000;
                no_price=false;
                break;
            case '1000-1500': price_low=1000;
                price_high=1500;
                no_price=false;
                break;
            case '1500-2000': price_low=1500;
                price_high=2000;
                no_price=false;
                break;
            case '2000-3000': price_low=2000;
                price_high=3000;
                no_price=false;
                break;
            case '3000-5000': price_low=3000;
                price_high=5000;
                no_price=false;
                break;
            case '5000以上': price_low=5000;
                price_high=1000000;
                no_price=false;
                break;
        }

        var bed;
        var no_type=true;
        switch(this.state.condition[2]) {
            case "不限":
                no_type = true;
                break;
            case '一室':
                bed = 1;
                no_type = false;
                break;
            case '两室':
                bed = 2;
                no_type = false;
                break;
            case '三室':
                bed = 3;
                no_type = false;
                break;
            case '四室以上':
                bed = 4;
                no_type = false;
                break;
        }



        console.log("cojjjjjjjjjjjjjjjjjjjjjjjjjjnditon");
        console.log(this.state.condition);

        var data = this.state.newdataSource.slice();


        //console.log(this.state.newdataSource.filter(item => item.price>price_low ).filter(item => item.price<price_high));

        //solr
        var solr_url;
        var solr_query_1 = "http://54.171.189.58:8983/solr/gettingstarted/select?indent=on&wt=json";
        var solr_seach="&q=*:*";

        var fq_region;
        var fq_price;
        var fq_type;
        var sort_price; //&sort=price asc

        var solr_url_3_fq_sort="";

       // solr_url=solr_query_1+solr_seach;

        if(this.state.condition[0]!="不限"){
            //solr
            fq_region="&fq=region:"+this.state.condition[0];
            solr_url_3_fq_sort=solr_url_3_fq_sort+fq_region;

            // data = data
            //     .filter(item => item.region === this.state.condition[0]);
        }

        if(no_price===false) {
            //solr
            fq_price="&fq=price_1: ["+price_low+" TO "+price_high+" ]";
            solr_url_3_fq_sort=solr_url_3_fq_sort+fq_price;



            // data = data
            //     .filter(item => item.price >= price_low)
            //     .filter(item => item.price < price_high);
        }

        if(no_type===false) {
            //solr

            if(bed != 4) {
                fq_type="&fq=bedroom: "+bed;
                solr_url_3_fq_sort=solr_url_3_fq_sort+fq_type;


                // data = data
                //     .filter(item =>parseInt(item.bed) === bed);
            } else {
                fq_type="&fq=bedroom: [4 TO "+bed+" ]";
                solr_url_3_fq_sort=solr_url_3_fq_sort+fq_type;


                // data = data
                //     .filter(item =>parseInt(item.bed) >= 4);
            }
        }
        if(this.state.condition[3]==="租金从低到高") {
            //solr
            sort_price="&sort=price_1 asc";
            solr_url_3_fq_sort=solr_url_3_fq_sort+sort_price;


            // data = sortJSON(data, "price", '123');
            // console.log("租金从低到高123");
        }
        if(this.state.condition[3]==="租金从高到低") {
            //solr
            sort_price="&sort=price_1 desc";
            solr_url_3_fq_sort=solr_url_3_fq_sort+sort_price;


            // data = sortJSON(data, "price", '321');
            // console.log("租金从高到低321");
        }

        // var newDs = [];
        // newDs = data;


        // newDs.map((newDs)=>newDs.price=newDs.price+1);
        this.state.solr_url_3_fq_sort=solr_url_3_fq_sort;
        this.setState({
            solr_url_3_fq_sort:solr_url_3_fq_sort
        });

        this.state.solr_url=this.state.solr_url_1+this.state.solr_url_2_search+this.state.solr_url_3_fq_sort;
        console.log("this.state.solr_url_filter");
        console.log(this.state.solr_url);

        this.setState({
            solr_url:this.state.solr_url
        });
        this.fetch_solr(this.state.solr_url);


        // console.log("data");
        // console.log(newDs);



        // this.setState({
        //     // newdataSource: data,
        //     dataSource: this.state.dataSource.cloneWithRows(data),
        // });
        //
        console.log("dataSource");
        console.log(this.state.dataSource);
    }
    // componentWillReceiveProps( nextProps ) {
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows( nextProps.data )
    //     });
    // }

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

