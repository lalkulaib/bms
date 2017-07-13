import Lightbox from 'react-native-lightbox'
import React, { Component } from 'react';
import {
  Image,
  View,
  WebView,
  ActivityIndicatorIOS,
  AsyncStorage,
  Linking,
  ScrollView
} from 'react-native'
import { Form, Item, Label, Input, ListItem, Switch, Grid, Col, Card, CardItem, Container, Header, Title, Content, Button, Footer, FooterTab, Text, Toast, Body, Left, Right, Icon, H1, H2, H3, Spinner } from 'native-base';
import Pie from 'react-native-pie';
import styles from './styles';
import ThermostatsList from './thermoList';
import CamerasList from './camerasList';
var Browser = require('react-native-browser');
var SafariView = require('react-native-safari-view');

// Movel Values
// const PRODUCT_ID = 'f28236d1-3877-4971-95f7-5f69e119d24a';
// const AUTH_URL = 'https://home.nest.com/login/oauth2?client_id=' + PRODUCT_ID + '&state=STATE';
// const PRODUCT_SECRET = 'EBZVpy4UPy7FvC8Hpykdnfy06';
// const ACCESS_TOKEN_URL = 'https://api.home.nest.com/oauth2/access_token';
// const NEST_API_URL = 'https://developer-api.nest.com';
// const BEMOSS_API_URL = 'https://bemoss-api.herokuapp.com/nest/api';


// Bemoss Values
const PRODUCT_ID = '7d7a95b7-53a6-4a90-bee2-35c9a6947b60';
const PRODUCT_SECRET = 'GElta8GxB9CEICAwM2zJGwGDO';
const AUTH_URL = 'https://home.nest.com/login/oauth2?client_id=' + PRODUCT_ID + '&state=STATE';
const ACCESS_TOKEN_URL = 'https://api.home.nest.com/oauth2/access_token';
const NEST_API_URL = 'https://developer-api.nest.com';
const BEMOSS_API_URL = 'https://bemoss-api.herokuapp.com/nest/api';


const sqsParams = {
    DelaySeconds: 5,
    MessageAttributes: {
        "Action": {
            DataType: "String",
            StringValue: "Write"
        },
        "DeviceName": {
            DataType: "String",
            StringValue: "Raspberry Pi 3"
        },
        "TempGauge": {
            DataType: "Number",
            StringValue: 23
        }
    },
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/067216503767/raspiQ"
};

export class Nest extends Component {

    constructor(props) {
        super(props);
        // this.deauthorize = this.deauthorize.bind(this);
        // this.receiveMessage = this.receiveMessage.bind(this);
        this.handlePinChange = this.handlePinChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePinSubmit = this.handlePinSubmit.bind(this);
        this.fetchDeviceData = this.fetchDeviceData.bind(this);
        this.deauthorize = this.deauthorize.bind(this);
        this.showNestPinWindow = this.showNestPinWindow.bind(this);
        this.closeNestPinWindow = this.closeNestPinWindow.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
    }

    fetchDeviceData() {
        this.setState({
            navStep2: false
        });

        Promise.all([this.getValueByKeyFromLocalStorage('email'),       this.getValueByKeyFromLocalStorage('token')]).then(values => {
            this.setState({
                email: values[0],
                token: values[1],
                navStep0: false,
                navStep1: false,
                navStep2: true,
                navStep3: false,
            });

            console.log('componentWillMount:');
            console.log('Local storage email: ' + this.state.email);
            console.log('Local storage token: ' + this.state.token);


            // Make call to NEST API
            // fetch POST call to NEST
            let deviceURL = BEMOSS_API_URL + '/devices';

            if (this.state.token && this.state.token != '') {
                fetch(deviceURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    token: this.state.token
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Server Auth Response -> " + JSON.stringify(responseData));
                if (responseData.error) {
                    // this.setState({
                    //     thermostats: responseData.error.type,
                    //     structures: responseData.error.message
                    // });
                    Toast.show({
                        supportedOrientations: ['portrait','landscape'],
                        text: 'NEST API call error',
                        position: 'bottom',
                        duration: 5000,
                        buttonText: 'Okay'
                    });
                } else {
                    // Toast.show({
                    //     supportedOrientations: ['portrait','landscape'],
                    //     text: 'API Call Successful!',
                    //     position: 'bottom',
                    //     duration: 2000,
                    //     buttonText: 'Okay'
                    // });
                    this.setState({
                        thermostats: responseData.thermostats?responseData.thermostats:[],
                        cameras: responseData.cameras?responseData.cameras:[],
                        step2: true
                    });
                }
            })
            .done();
            }
        });
    }

    componentWillMount() {
        this.setState({
            showToast: false,
            tempGauge: 50,
            radio1: false,
            radio2: false,
            radio3: false,
            navStep0: true,
            navStep1: false,
            navStep2: false,
            navStep3: false,
            pin: null,
            email: null,
            token: null
        });
    }

    componentDidMount() {
        this.fetchDeviceData();

        // this.setInterval(
        //     () => {
        //         console.log('Checking for a new message');
        //         this.receiveMessage();
        //     },
        //     100000
        // );
    }

    async writeKeyValueToLocalStorage(key, value) {
        try {
            await AsyncStorage.setItem('@BemossStore:' + key, value);
        } catch (error) {
            // Error saving data
        }
    }

    async getValueByKeyFromLocalStorage(key) {
        var value;
        try {
            value = await AsyncStorage.getItem('@BemossStore:' + key);
                if (value !== null){
                    // We have data!!
                    console.log('getValueByKeyFromLocalStorage -> ' + key + ': ' + value);
                } else {
                    console.log('Nothing in local storage!');
                }
        } catch (error) {
            // Error retrieving data
            console.log(rror.message);
        }
        return value;
    }

    // Messages
    deauthorize() {
        console.log('Deauthorizing');
        this.setState({
            token: null,
            email: null,
            thermostats: null,
            navStep0: true,
            navStep1: false
        });

        this.writeKeyValueToLocalStorage('email', this.state.email).then(() => console.log(this.state.email + ' email stored to local storage.'));
        this.writeKeyValueToLocalStorage('token', this.state.token).then(() => console.log(this.state.token + ' access token stored to local storage.'));
    }

    showNestPinWindow() {
        Linking.canOpenURL(AUTH_URL).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + AUTH_URL);
          } else {
            return Linking.openURL(AUTH_URL);
          }
        }).catch(err => console.error('An error occurred', err));

        setTimeout(() => {
            this.setState({
                navStep0: false,
                navStep1: true,
                navStep2: false,
                navStep3: false,
            }); }, 500
        );
    }

    closeNestPinWindow(url) {
        setTimeout(() => {
            this.setState({
                navStep0: true,
                navStep1: false,
                navStep2: false,
                navStep3: false,
            }); }, 500
        );
    }

    getAccessToken(pin) {
        console.log('PIN: ' + this.state.pin);
        console.log(encodeURIComponent(PRODUCT_ID));
        console.log(encodeURIComponent(PRODUCT_SECRET));
        console.log(encodeURIComponent(ACCESS_TOKEN_URL));
        console.log(encodeURIComponent('authorization_code'));

        var details = {
            client_id: PRODUCT_ID,
            client_secret: PRODUCT_SECRET,
            grant_type: 'authorization_code',
            code: this.state.pin
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log('formBody -> ' + formBody);

        fetch(ACCESS_TOKEN_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("Server Auth Response -> " + JSON.stringify(responseData));
            if (responseData.error) {
                // Toast.show({
                //     supportedOrientations: ['portrait','landscape'],
                //     text: responseData.error_description,
                //     position: 'bottom',
                //     duration: 5000,
                //     buttonText: 'Okay'
                // });
            } else {
                // Toast.show({
                //     supportedOrientations: ['portrait','landscape'],
                //     text: 'Authorization Successful!',
                //     position: 'bottom',
                //     duration: 2000,
                //     buttonText: 'Okay'
                // });

                this.setState({
                    token: responseData.access_token,
                    navStep0: false,
                    navStep1: false,
                    navStep2: true,
                    navStep3: false,
                });

                this.writeKeyValueToLocalStorage('email', this.state.email).then(() => console.log(this.state.email + ' email stored to local storage.'));
                this.writeKeyValueToLocalStorage('token', this.state.token).then(() => console.log(this.state.token + ' access token stored to local storage.'));
                this.fetchDeviceData();
            }
        })
        .done();

    }

    handlePinChange(event) {
        // this.setState({pin: event.target.value});
    }

    handleEmailChange(event) {
        // this.setState({pin: event.target.value});
    }

    handlePinSubmit(event) {
        alert('A PIN was submitted: ' + this.state.pin);
        event.preventDefault();
    }

    render() {
        return (
            <Content padder>

                {/* <Image source={require('../../../../img/nest.jpg')} style={styles.backgroundImage} /> */}
                {/* <Container style={{ height: 60 }}>
                    <Content>
                        <Grid>
                            <Col style={{ backgroundColor: '#fff', height: 20,paddingRight: 10 }}>
                                <Button success block iconLeft onPress={() => this.showNestPinWindow()}>
                                    <Icon name="ios-unlock-outline" style={{ color: '#fff' }} />
                                    <Text>Authorize</Text>
                                </Button>
                            </Col>
                            <Col style={{ backgroundColor: '#fff', height: 20 }}>
                                <Button danger block iconLeft onPress={() => this.deauthorize()}>
                                    <Icon name="ios-lock-outline" style={{ color: '#fff' }} />
                                    <Text style={{ }}>Deauthorize</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </Content>
                </Container> */}

                { this.state && this.state.navStep1 &&
                    <Container >
                        <Content>
                            <Form onSubmit={this.handlePinFormSubmit}>
                                <Item>
                                    <Icon active name='ios-mail-outline' />
                                    <Input placeholder='Your Email Address'
                                        value={this.state.email}
                                        onChangeText={(email) => this.setState({email})}
                                    />
                                </Item>
                                <Item>
                                    <Icon active name='ios-key-outline' />
                                    <Input placeholder='PIN Code From Nest'
                                        value={this.state.pin}
                                        onChangeText={(pin) => this.setState({pin})}
                                    />
                                </Item>
                                <Button onPress={() => this.getAccessToken()} primary block style={{ marginBottom: 10 }}>
                                    <Icon name="ios-unlock-outline" style={{ color: '#fff' }} />
                                    <Text>Authorize</Text>
                                </Button>
                                <Button onPress={() => this.closeNestPinWindow()} block light>
                                    <Text>Cancel</Text>
                                </Button>

                            </Form>
                        </Content>
                    </Container>
                }

                { this.state && this.state.navStep2 && !this.state.thermostats &&

                    <View>
                        <ScrollView>
                            <Container style={{ height: 400 }}>
                                <Content>
                                    <H3 style={{ marginBottom: 10 }}>Loading</H3>
                                    <Spinner />
                                </Content>
                            </Container>
                        </ScrollView>
                    </View>
                }

                { this.state && this.state.navStep2 && this.state.thermostats &&

                    <View>
                        <ScrollView>
                            <Container style={{ height: 430 }}>
                                <Content>
                                    <H3 style={{ marginBottom: 10 }}>Thermostats</H3>
                                    <ThermostatsList thermostats={this.state.thermostats}/>
                                    <H3 style={{ marginBottom: 10, marginTop: 30 }}>Cameras</H3>
                                    <CamerasList cameras={this.state.cameras}/>
                                </Content>
                            </Container>
                        </ScrollView>

                        <View>
                            <Container>
                                <Content>
                                    <Grid>
                                        <Col style={{ backgroundColor: '#fff', height: 20 }}>
                                            <Button danger block iconLeft onPress={() => this.deauthorize()}>
                                                <Icon name="ios-lock-outline" style={{ color: '#fff' }} />
                                                <Text style={{ }}>Deauthorize</Text>
                                            </Button>
                                        </Col>
                                    </Grid>
                                </Content>
                            </Container>
                        </View>
                    </View>



                }

                { this.state && this.state.navStep3 &&
                    <Container >
                        <Content>
                            <H1>Step 3</H1>
                        </Content>
                    </Container>
                }

                { this.state && !this.state.token &&
                <Container style={{ height: 60 }}>
                    <Content>
                        <Grid>
                            <Col style={{ backgroundColor: '#fff', height: 20,paddingRight: 10 }}>
                                <Button success block iconLeft onPress={() => this.showNestPinWindow()}>
                                      <Icon name="ios-unlock-outline" style={{ color: '#fff' }} />
                                      <Text>Authorize</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </Content>
                </Container>
              }

              {/* { this.state && this.state.token &&
                  <Container style={{ height: 60 }}>
                      <Content>
                          <Grid>
                              <Col style={{ backgroundColor: '#fff', height: 20 }}>
                                  <Button danger block iconLeft onPress={() => this.deauthorize()}>
                                      <Icon name="ios-lock-outline" style={{ color: '#fff' }} />
                                      <Text style={{ }}>Deauthorize</Text>
                                  </Button>
                              </Col>
                          </Grid>
                      </Content>
                  </Container>
              } */}





















                {/* <Container style={{ height: 160 }}>
                    <Content>
                        <ListItem icon onPress={() => this.toggleRadio('radio1')}>
                            <Left>
                                <Icon name="bluetooth" />
                            </Left>
                            <Body>
                              <Text>Blue Appliance (Bluetooth)</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.radio1} onValueChange={() => this.toggleRadio('radio1')} />
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => this.toggleRadio('radio2')}>
                            <Left>
                                <Icon name="wifi" />
                            </Left>
                            <Body>
                              <Text>Red Appliance (Wi-Fi)</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.radio2} onValueChange={() => this.toggleRadio('radio2')} />
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => this.toggleRadio('radio3')}>
                            <Left>
                                <Icon name="pulse" />
                            </Left>
                            <Body>
                              <Text>Green Applicance (Sensor)</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.radio3} onValueChange={() => this.toggleRadio('radio3')} />
                            </Right>
                        </ListItem>
                    </Content>
                </Container>

                <Card style={styles.mb}>
                    <CardItem>
                        <Body>
                            <H3 style={{ paddingBottom: 20 }}>Temperature (Bldg-A)</H3>

                            <Body style={{ paddingBottom: 20 }}>
                              <Pie
                                radius={100}
                                innerRadius={65}
                                series={[this.state.tempGauge]}
                                colors={['#e43f85']}
                                backgroundColor='#ddd' />
                                <Body style={styles.gauge}>
                                  <H1 style={styles.gaugeText}>{this.state.tempGauge + String.fromCharCode(176)}F</H1>
                                </Body>
                            </Body>
                        </Body>
                    </CardItem>
                </Card>

                <Card style={styles.mb}>
                    <CardItem>
                        <Body>
                            <H3 style={{ paddingBottom: 20 }}>Humidity (Bldg-A)</H3>

                            <Body style={{ paddingBottom: 20 }}>
                              <Pie
                                radius={100}
                                innerRadius={65}
                                series={[this.state.tempGauge * Math.random()]}
                                colors={['#6faf98']}
                                backgroundColor='#ddd' />
                                <Body style={styles.gauge}>
                                  <H1 style={styles.gaugeText}>{Math.floor(this.state.tempGauge * Math.random()) + '%'}</H1>
                                </Body>
                            </Body>
                        </Body>
                    </CardItem>
                </Card> */}
                    {/*
                    <Pie
                      radius={100}
                      series={[10, 20, 30, 40]}
                      colors={['red', 'lime', 'blue', 'yellow']} />
                    <Pie
                      radius={100}
                      innerRadius={60}
                      series={[10, 20, 30, 40]}
                      colors={['#f00', '#0f0', '#00f', '#ff0']} /> */}
            </Content>
        );
    }
};
