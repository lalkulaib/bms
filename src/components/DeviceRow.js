import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Switch } from 'react-native';
import { Form, Label, Item, Icon, Right, Button } from 'native-base';


export default class DeviceRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lightStatus: this.props.status === 'on' ? true : false
        }
    }

    renderIcon() {

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
            <View style={ styles.container }>
                <View style={{ paddingLeft: 10 }}>
                    <Image style={{width: 60, height: 60}} source={this.props.img} />
                </View>

                <Text style={{ fontSize: 18, paddingLeft: 20 }}>{this.props.name}</Text>

                <Right style={{ paddingRight: 20 }}>
                    { this.renderStatus() }
                </Right>

            </View>
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
