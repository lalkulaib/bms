import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Modal,
  View,
  ScrollView
} from 'react-native';
import Slider from 'react-native-slider';
import { H1, H2, H3, Button, Container, Content, List, ListItem, Text, Icon, Badge, Left, Body, Right, Switch, Card, CardItem, Thumbnail } from 'native-base';
import styles from './styles';

export default class Camera extends Component {

    showCameraDetailModal(camera) {
        this.setState({
            modalVisible: true,
            camera: camera
        });
    }

    constructor(props) {
        super(props);
        this.showCameraDetailModal = this.showCameraDetailModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            modalVisible: false,
            camera: null
        });
    }

    componentDidMount() {

    }

    render() {
        const camera = this.props.camera;
        return (
            <View>
            <ListItem onPress={() => this.showCameraDetailModal(camera)} icon key={camera.device_id}>
                <Left>
                    <Icon name="camera" />
                </Left>
                <Body>
                  <Text>{camera.name}</Text>
                </Body>
                <Right>
                    <Text>{camera.software_version}</Text>
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
                      <H3>Camera: {camera.name}</H3>
                      <Card>
                        <CardItem>
                          <Left>
                            <Thumbnail source={{uri: camera.snapshot_url}} />
                            <Body>
                              <Text>Latest Snapshot</Text>
                              <Text note>{camera.name_long}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                        <CardItem cardBody>
                          <Image source={{uri: camera.snapshot_url}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                          <Text>{camera.end_time}</Text>
                        </CardItem>
                      </Card>

                  </ScrollView>

                    <View>
                        <Button onPress={() => this.setState({modalVisible: false})} primary block>
                          <Text>Back</Text>
                        </Button>
                    </View>

                </View>
            </Modal>
        </View>
        )
    }
}
