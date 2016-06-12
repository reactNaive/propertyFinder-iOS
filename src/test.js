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


export default class Test extends Component{

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.title !== r2.title});
        this.state = {
            entries: [],
            dataSource: dataSource.cloneWithRows(['John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie'])
        };
    }



    renderRow(rowData) {

        return (
            <TouchableHighlight
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        {/*<Image style={styles.thumb} source={{ uri: rowData.img_url }} />*/}
                        <View  style={styles.textContainer}>
                            <Text style={styles.title}
                                  numberOfLines={2}>{rowData}</Text>
                            <Text style={styles.price} numberOfLines={3}>{rowData.content}</Text>
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
        );
    }
}

var styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 15,
        //color: '#48BBEC'
        color: '#656565',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    container: {
        flex: 1,
    }
});