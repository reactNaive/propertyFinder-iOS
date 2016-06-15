
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    WebView,
    Image,
} = React;


var aboutus = React.createClass({

    render: function() {
        const URL = 'https://ictourblog.wordpress.com/about-us';

        return (
            <View style={styles.container}>
                <WebView style={styles.web}
                         automaticallyAdjustContentInsets={true}
                         source={{url:URL}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         onNavigationStateChange={this.onNavigationStateChange}
                         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                         startInLoadingState={true}
                    //scalesPageToFit={this.state.scalesPageToFit}
                />
            </View>
        );
    }
});

var Dimensions = require('Dimensions');
//var windowSize = Dimensions.get('window');
var { width, height } = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonContainer: {
        bottom: 0,
        flex: .1,
        width: width,
        backgroundColor: '#eee',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 30,
        color: '#666666',
    },
    image: {
        width: width,
        height: width/1294*592
    },
    webView: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        //height: 350,
    },
});

module.exports = aboutus;
