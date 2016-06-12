import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import Mainview from './Mainview';

class propertyfinder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Mainview/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('propertyfinder', () => propertyfinder);
