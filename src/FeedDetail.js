import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Linking,
} from 'react-native';

import Swiper from 'react-native-swiper';

var Icon = require('react-native-vector-icons/MaterialIcons');
var { width, height } = Dimensions.get('window');

const picHeight = (height-52-64)/2;

function convert(input) {
    return input*width/320;
}

export default class FeedDetail extends Component {

    constructor(props) {
        super(props);
        this.entry = this.props.data;
        this.state = {
        };
    }

    rengerImg() {
        var rows = [];
        for (var j=0; j < 3; j++) {
            rows.push(<View style={styles.slide1} key={j}>
                <Image
                    style={styles.img}
                    source={{ uri: "http://gatehouse-elite.com/wp-content/gallery/sundance-ridge-luxury-real-estate-for-sale-on-st-kitts-the-suncatcher-villa/new-luxury-real-estate-for-sale-on-sundance-ridge-saint-kitts-ocean-views-carribean-property.jpg" }}
                />
            </View>);
        }
        return rows;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height: height-50}}>
                    <ScrollView style={styles.container}>
                        <Swiper style={styles.wrapper} height={picHeight}>
                            {this.rengerImg()}
                        </Swiper>
                        <View style={styles.head}>
                            <Text style={{paddingTop: 3, paddingBottom: 5,fontSize: 16,color: 'black',fontWeight: 'bold',paddingLeft: 15}}>{this.entry.name}</Text>
                            <Text style={[styles.text1,{fontSize: 15, color: '#397CDC', paddingTop:4, paddingBottom: 1}]}>{this.entry.price}万元</Text>
                        </View>

                        <View style={styles.body1}>
                            <Text style={[styles.text1,{paddingBottom: 5}]}>{this.entry.addr}</Text>
                            <Text style={[styles.text1,{paddingBottom: 5}]}>{this.entry.adv}</Text>
                            <Text style={[styles.text1,{paddingBottom: 5}]}>{this.entry.area}平米</Text>
                            <View style={{paddingLeft: 15, paddingBottom: 15, paddingTop: 5,flexDirection: 'row'}}>
                                <View style={{height: 35, width: 35, borderWidth: 2, borderRadius: 35/2, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="local-hotel" size={25} color="black" />
                                </View>
                                <Text style={[styles.text1,{paddingLeft: 5}]}>{this.entry.bed}</Text>
                                <View style={{height: 35, width: 35, borderWidth: 2, borderRadius: 35/2, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="event-seat" size={25} color="black" />
                                </View>
                                <Text style={[styles.text1,{paddingLeft: 5}]}>{this.entry.living}</Text>
                                <View style={{height: 35, width: 35, borderWidth: 2, borderRadius: 35/2, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="wc" size={25} color="black" />
                                </View>
                                <Text style={[styles.text1,{paddingLeft: 5}]}>{this.entry.wc}</Text>
                            </View>
                        </View>
                        <View style={styles.body1}>
                            <Text style={[styles.text1,{color: '#397CDC', paddingTop:4, paddingBottom: 1}]}>房源概况</Text>
                            <Text style={[styles.text1,{paddingBottom: 5}]}>项目位于迎春南路（中山北路）与兴中路的交汇处。北靠兴吴路，南临兴中路，东临吴江主干道中山北路，西面紧邻在建的轻轨4号线清树湾站，项目紧挨吴中区邵昂路生活圈。</Text>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => Linking.openURL("tel:13002282349")}
                    underlayColor='#dddddd'
                >
                    <View style={styles.picv}>
                        <Icon name='account-circle' size={25} color="white"/>
                    </View>
                    <View style={styles.textv}>
                        <Text style={styles.text2}>联系我们</Text>
                    </View>
                    <View style={styles.picv1}>
                        <Icon name='call' size={25} color="white"/>
                    </View>
                </TouchableOpacity>
                {StatusBar.setBarStyle("light-content")}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: 'transparent',
    },
    pic: {
        //marginTop: -20,
        //flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        height: picHeight,
        //borderWidth: 1,
        //borderColor: 'red',
    },
    head: {
        //flex: 2,
        paddingTop: 10,
        paddingBottom: 5,
        //marginLeft: 15,
        //alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        //borderWidth: 1,
        //borderColor: 'red',
    },
    body1: {
        //flex: 5.5,
        //marginLeft: 15,
        //flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        //borderColor: 'red',
        borderBottomColor: 'lightgrey',
    },
    text1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 5,
        //lineHeight: 20,
        //textAlign: 'justify',
    },
    separate: {
        height: height/25,
    },
    building: {
        resizeMode: 'contain',
        width: width,
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    img: {
        width: width,
        height: picHeight,
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    row: {
        //marginTop: 64,
        flex: 1,
        //marginLeft: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
        height: height/13,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        backgroundColor: '#19CAB6',
        //borderWidth: 1,
        //borderColor: 'red',
    },
    picv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textv: {
        justifyContent: 'center',
        flex: 4,
    },
    picv1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        fontSize: 17,
        color: 'white',
    },
});
