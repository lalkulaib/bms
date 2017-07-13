import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Switch
} from 'react-native';
import { Icon, Header, Left, Right, Body, Title, Content, Container, Button } from 'native-base';
import Drawer from 'react-native-drawer';
import { Actions } from 'react-native-router-flux';
import CommonStyle from '../components/styles.css';
import Display from 'react-native-display';

import { Nest } from './nest/tab-nest';
import SideBar from '../components/SideBar';


export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            drawerOpened: false
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

                <Header>
                    <Left>
                        <Button transparent onPress={ () => this.setState({ drawerOpened: true }) }>
                          <Icon name='menu' style={{fontSize: 30, color: 'black'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <Display enable>
                        <Nest />
                    </Display>
                </Content>

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
