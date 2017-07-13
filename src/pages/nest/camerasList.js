import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import styles from './styles';
import Camera from './camera.js';


export default class CamerasList extends Component {
    renderCameras() {
        const cameras = this.props.cameras;
        var thermoItems;
        if (cameras.length > 0) {
            thermoItems = cameras.map((camera) =>
                <Camera key={camera.device_id} camera={camera} />
            );
        } else {
            thermoItems = <Content><Text>You have no cameras defined.</Text><Text>Please add one at www.nest.com and refresh the app.</Text></Content>;
        }

        return thermoItems;
    }

    render() {
        return (
            <Content>
                {this.renderCameras()}
            </Content>
        )
    }
}
