import React, { Component } from 'react';
import {
    WebView,
} from 'react-native';

export default class FeedDetail extends Component {

    render() {
        var entry = this.props.entry;

        return (
            <WebView
                automaticallyAdjustContentInsets={true}
                //style={styles.webView}
                source={{url: entry.link}}
                javaScriptEnabled={true}
                //domStorageEnabled={true}
                startInLoadingState={true}
                onNavigationStateChange={this.onNavigationStateChange}
                //onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                //startInLoadingState={true}
                //scalesPageToFit={this.state.scalesPageToFit}
            />
        );
    }
}
