import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Alert,
  PanResponder,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import { Header, Left, Right, Title, Icon, Item, Container, Label, Input, Content, Button, Form, Body,
         Footer, FooterTab, Toast } from 'native-base';

import DeviceRow from './DeviceRow';

export default class DeviceList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListView
                dataSource={ this.props.dataSource }
                renderRow={ (data, secId, rowId) => <DeviceRow { ...data } /> }
                renderSeparator={ (sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
            />
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#BDBDBD',
        marginLeft: 10,
    },
});
