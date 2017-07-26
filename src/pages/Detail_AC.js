import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from '../firebase/firebase';
import { Icon, Header, Left, Right, Body, Title, Content, Container, Footer, Button } from 'native-base';
import api from '../utils/api';

export default class AcDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      temp: parseInt(this.props.status)
    }
  }

  componentDidMount() {
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
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='md-arrow-back' style={styles.menuIcon} />
            </Button>
          </Left>
          <Body>
            <Title>BEMOSS</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.content}>
          <View style={styles.topBar}>
            <View style={{paddingLeft: 10}}>
              <Image style={{width: 60, height: 60}} source={this.props.img} />
            </View>
            <Text style={{fontSize: 18, paddingLeft: 20}}>{this.props.title}</Text>
            <Right style={{paddingRight: 20}}>
              { this.renderStatus() }
            </Right>
          </View>
          <View style={styles.separator} />

          <View style={{paddingLeft: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Text>Heat Setpoint</Text>
              <Text style={{fontSize: 40}}>{this.state.temp}`</Text>
            </View>
            <View style={{paddingRight: 50}}>
              <Button style={{backgroundColor: 'black', opacity: 0.7, margin: 5}} onPress={() => this.setState({ temp: this.state.temp+1 })}>
                <Icon name='ios-arrow-up' color="white" style={styles.buttonIcon} />
              </Button>
              <Button style={{backgroundColor: 'black', opacity: 0.7,  margin: 5}} onPress={() => this.setState({ temp: this.state.temp-1 })}>
                <Icon name='ios-arrow-down' style={styles.buttonIcon} />
              </Button>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Hold Until 6:00 PM</Text>
            <Button style={{ marginTop: 20, width: '80%', alignSelf: 'center', backgroundColor: 'gray'}}>
              <Text style={{paddingRight: 50, color: 'white'}}>Press for Options</Text>
            </Button>
          </View>


        </Content>
      </Container>
    )
  }

}

const styles = {
    topBar: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#BDBDBD',
        marginLeft: 10,
    },
    menuIcon: {
      color: '#000',
      fontSize: 30
    },
    buttonIcon: {
      color: '#FFF',
      fontSize: 30
    },
    header: {
      backgroundColor: '#F1D854'
    },
    content: {
      backgroundColor: '#FFF',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10
    }
  };
