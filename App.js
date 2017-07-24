import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Home   from './src/pages/Home';
import Login  from './src/pages/Login';
import Blank  from './src/pages/Blank';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="blank" component={Blank}  initial={true} hideNavBar={true} />
          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene key="home"  component={Home}   hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}
