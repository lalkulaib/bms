import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from '../firebase/firebase';
import { Icon, Header, Left, Right, Body, Title, Content, Container, Footer, Button } from 'native-base';
import api from '../utils/api';

export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      lightStatus: this.props.status === 'on' ? true : false
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
            <Text style={{fontSize: 18, paddingLeft: 20}}>{this.props.name}</Text>
            <Right style={{paddingRight: 20}}>
              { this.renderStatus() }
            </Right>
          </View>
          <View style={styles.separator} />

          <View style={{flexDirection: 'row', paddingLeft: 30, paddingBottom:10,paddingTop: 20}}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20, color: 'rgba(115, 211, 75, 1)'}}>On now for:</Text>
              <Text style={{fontSize: 40, color: 'rgba(115, 211, 75, 1)', fontWeight: 'bold'}}>18h24m</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Since:</Text>
              <Text style={{fontSize: 30, paddingBottom: 5}}>11:39 am</Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={{paddingLeft: 30, paddingTop: 10, paddingBottom:10,  paddingRight: 20}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
              <Text style={{fontSize: 20}}>Today:</Text>
              <Text style={{fontSize: 20, color: '#F1D854', fontWeight: 'bold'}}>13h 12m</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Avg day:</Text>
              <Text style={{fontSize: 20, paddingBottom: 5}}>8h 34m</Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={{paddingLeft: 30, paddingTop: 10, paddingBottom:10, paddingRight: 20}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
              <Text style={{fontSize: 20}}>Estimated monthly:</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>--</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Today:</Text>
              <Text style={{fontSize: 20, paddingBottom: 5}}>$0.01</Text>
            </View>
          </View>
          <View style={styles.separator} />


          <View style={{paddingLeft: 30, paddingTop: 10, paddingBottom:10, paddingRight: 20}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
              <Text style={{fontSize: 20}}>Avg when on:</Text>
              <Text style={{fontSize: 20}}>75w</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Now:</Text>
              <Text style={{fontSize: 20, paddingBottom: 5}}>70w</Text>
            </View>
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
