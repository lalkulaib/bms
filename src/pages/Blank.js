import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from '../firebase/firebase';
import api from '../utils/api';

export default class Blank extends Component {

  componentDidMount() {
      api('isloggedin', 'GET')
        .then(res => res.status ? Actions.home() : Actions.login())
        .catch(err => Actions.login())
  }

  render() {
    return (
      <View />
    )
  }

}
