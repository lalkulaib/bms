import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Switch,
    ListView
} from 'react-native';
import { Icon, Header, Left, Right, Body, Title, Content, Container, Footer, Button } from 'native-base';
import Drawer from 'react-native-drawer';
import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';

import SideBar from '../components/SideBar';
import DeviceList from '../components/DeviceList';
import Colors from '../theme/colors'


const fakeDevices = [
    {
        img: require('../Img/light.jpg'),
        type: 'light',
        name: 'Light1',
        status: 'off'
    },
    {
        img: require('../Img/insight.png'),
        type: 'plug',
        name: 'Insight',
        status: 'on'
    },
    {
        img: require('../Img/livingroom.png'),
        type: 'plug',
        name: 'Living Room',
        status: 'off'
    },
    {
        img: require('../Img/mini.png'),
        type: 'plug',
        name: 'Mini',
        status: 'on'
    },
    {
        img: require('../Img/temp.png'),
        type: 'ac',
        name: 'AC',
        status: '78'
    }
]


export default class Home extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            drawerOpened: false,
            dataSource: ds.cloneWithRows(fakeDevices)
        }
    }

    render() {
        return (
            <Drawer
                content          = { <SideBar closeDrawer={ () => this.setState({ drawerOpened: false }) } /> }
                onClose          = { () => this.setState({ drawerOpened: false }) }
    	        open             = { this.state.drawerOpened }
                openDrawerOffset = { .35 }
                tapToClose       = { true }
                type             = "overlay"
            >
            <Container>

                <Header style={{ backgroundColor: Colors.header }}>
                    <Left>
                        <Button transparent onPress={ () => this.setState({ drawerOpened: true }) }>
                          <Icon name='menu' style={{fontSize: 30, color: '#FFF'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#FFF', fontSize: 20 }}>BEMOSS</Title>
                    </Body>
                    <Right />
                </Header>

                <Content style={{ backgroundColor: '#FFF' }}>
                    <DeviceList dataSource={this.state.dataSource} />
                </Content>

                <Footer style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, paddingTop: 10}}>
                    <Icon name="star" />
                    <Icon name="cloud" />
                    <Icon name="alarm" />
                </Footer>

            </Container>
        </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
