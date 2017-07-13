import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from '../firebase/firebase';
import { Icon, Button } from 'native-base';
import api from '../utils/api';

export default class Blank extends Component {

    async logout() {
        try {
            const response = await api('logout', 'GET');
            console.log(Actions)
            Actions.login({type: ActionConst.POP_TO});
            //Actions.popTo('Login');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { closeDrawer } = this.props;
        return (
            <View style={ styles.container }>
                {/* <Button transparent iconLeft onPress={closeDrawer} style={styles.closeBtn}>
                   <Icon name='close-circle' style={{ fontSize: 20, color: 'black' }} />
                 </Button> */}

                 <Image
                     style={{ width: '70%', height: 50, alignSelf: 'center', marginTop: 20 }}
                     source={ require('../Img/BEMOSS_logo.png') }
                 />

                <Button transparent iconLeft onPress={this.logout} style={styles.logoutBtn}>
                   <Icon name='log-out' style={{ fontSize: 30, color: 'black' }} />
                   <Text>LOG OUT</Text>
                 </Button>
             </View>
        )
    }

}

const styles = {
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#FFBD08'
    },
    closeBtn: {
        position: 'absolute',
        top: 30,
        right: 10
    },
    logoutBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    Img: {
        height: 20,
        width: 40,
    }
};
