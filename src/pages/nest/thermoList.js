import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import styles from './styles';
import Thermostat from './thermostat.js';


export default class ThermostatsList extends Component {
    renderThermostats() {
        const thermostats = this.props.thermostats;
        var thermoItems;
        if (thermostats.length > 0) {
            thermoItems = thermostats.map((thermostat) =>
                <Thermostat key={thermostat.device_id} thermostat={thermostat} />
            );
        } else {
            thermoItems = <Content><Text>You have no thermostats defined.</Text><Text>Please add one at www.nest.com and refresh the app.</Text></Content>;
        }

        return thermoItems;
    }

    render() {
        return (
            <Content>
                {this.renderThermostats()}
            </Content>
        )
    }
}
