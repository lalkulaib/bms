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
import axios from 'axios';
import SideBar from '../components/SideBar';
import DeviceList from '../components/DeviceList';
import Colors from '../theme/colors'
import api from '../utils/api'

// const fakeDevices = [
//     {
//         img: require('../Img/light.jpg'),
//         type: 'light',
//         title: 'Light1',
//         status: 'off'
//     },
//     {
//         img: require('../Img/insight.png'),
//         type: 'plug',
//         title: 'Insight',
//         status: 'on'
//     },
//     {
//         img: require('../Img/livingroom.png'),
//         type: 'plug',
//         title: 'Living Room',
//         status: 'off'
//     },
//     {
//         img: require('../Img/mini.png'),
//         type: 'plug',
//         title: 'Mini',
//         status: 'on'
//     },
//     {
//         img: require('../Img/temp.png'),
//         type: 'ac',
//         title: 'AC',
//         status: '78'
//     }
// ]


export default class Home extends Component {
    constructor(props) {
        super(props);

        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            drawerOpened: false,
            fakeDevices: [],
            dataSource: []
        }
    }

    componentWillMount() {
        let devType, name, stat
        url = '/common/dbapi/retrieve'
        method ='POST'
        var info = {
            'tablename': 'device_info',
            'where_data': {},
            'user': 'admin',
            'auth': 'admin',
        }
        api(url, method, info).then(res => {
           devType = res.data.device_type
           name = res.data.vendor_name
        })
        .catch(err => {
            //handle error
        })

        var info1 = {
            'tablename': 'devicedata',
            'where_data': {},
            'user': 'admin',
            'auth': 'admin',
        }
        api(url, method, info1).then(res => {
            stat = res.data.status
        })
        .catch(err => {

        })
        this.setState({fakeDevices: [...this.state.fakeDevices, 
            { img: require('../Img/mini.png'), type: devType, title: name, status: stat}]})

    }

    render() {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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

                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={ () => this.setState({ drawerOpened: true }) }>
                              <Icon name='menu' style={styles.menuIcon} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>BEMOSS</Title>
                        </Body>
                        <Right />
                    </Header>

                    <Content style={styles.content}>
                        <DeviceList dataSource={ds.cloneWithRows(this.state.fakeDevices)} />
                    </Content>

                    <Footer style={styles.footer}>
                        <Icon name="star" />
                        <Icon name="cloud" />
                        <Icon name="alarm" />
                    </Footer>

                </Container>
            </Drawer>
        );
    }
}

const styles = {
    menuIcon: {
        color: '#000',
        fontSize: 30
    },
    header: {
        backgroundColor: '#F1D854'
    },
    content: {
        backgroundColor: '#FFF'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10
    }

};
