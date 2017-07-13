import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Modal,
  View,
  ScrollView
} from 'react-native';
import Slider from 'react-native-slider';
import { H1, H2, H3, Button, Container, Content, List, ListItem, Text, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import styles from './styles';

export default class Thermostat extends Component {

    showThermostatDetailModal(thermostat) {
        this.setState({
            modalVisible: true,
            thermostat: thermostat,
            ambient_temperature_f: thermostat.ambient_temperature_f
        });
    }

    constructor(props) {
        super(props);
        this.showThermostatDetailModal = this.showThermostatDetailModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            modalVisible: false,
            thermostat: null,
            ambient_temperature_f: 50
        });
    }

    componentDidMount() {

    }

    render() {
        const thermostat = this.props.thermostat;
        return (
            <View>
            <ListItem onPress={() => this.showThermostatDetailModal(thermostat)} icon key={thermostat.device_id}>
                <Left>
                    <Icon name="ios-home-outline" />
                </Left>
                <Body>
                  <Text>{thermostat.name}</Text>
                </Body>
                <Right>
                    <Text>{thermostat.ambient_temperature_f} {String.fromCharCode(176)}F</Text>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>


            <Modal
                transparent={true}
                visible={(this.state && this.state.modalVisible)}
                >

                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#f3f3f3',
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    padding: 20,
                  }}>
                  <ScrollView>
                      <H1 style={{ marginBottom: 20 }}>Thermostat Details</H1>
                      <H3>{thermostat.name_long}</H3>

                      <Slider
                          value={thermostat.ambient_temperature_f}
                          minimumValue={thermostat.ambient_temperature_f - 20}
                          maximumValue={thermostat.ambient_temperature_f + 20}
                          step={1}
                          onValueChange={(ambient_temperature_f) => this.setState({ambient_temperature_f})} />
                          <Text>Current temperature: {thermostat.ambient_temperature_f}</Text>
                          <Text>Target temperature: {this.state.ambient_temperature_f}</Text>
                  </ScrollView>

                    <View>
                        <Button onPress={() => this.setState({modalVisible: false})} primary block>
                          <Text>Update</Text>
                        </Button>
                    </View>

                </View>
            </Modal>
        </View>
        )
    }
}
