import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Switch } from 'react-native';
import { Form, Label, Item, Icon, Right, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class DeviceRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lightStatus: this.props.status === 'on' ? true : false
      }
      console.log(this.props)
    }

    renderStatus() {
      switch (this.props.type) {
        case 'plug':
        case 'light':
          return <Switch
                  value={this.state.lightStatus}
                  onChange={() => this.setState({ lightStatus: !this.state.lightStatus })}
                />

          case 'ac':
            return <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.props.status}</Text>

          default:
            return <View />
      }
    }

    render() {
      return (
        <TouchableOpacity style={styles.container} onPress={() => Actions.detail(this.props)} >
          <View style={{ paddingLeft: 10 }}>
            <Image style={{width: 60, height: 60}} source={this.props.img} />
          </View>

          <Text style={{ fontSize: 18, paddingLeft: 20 }}>{this.props.title}</Text>

          <Right style={{ paddingRight: 20 }}>
            { this.renderStatus() }
          </Right>

        </TouchableOpacity>
      )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
