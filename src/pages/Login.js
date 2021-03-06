import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  dismissKeyboard,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator
} from 'react-native';
import { Item, Input, Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import DismissKeyboard from 'dismissKeyboard';
import firebase from '../firebase/firebase';
import api from '../utils/api';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            response: '',
            loginProgress: false,
            signupProgress: false,
        };

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    async signup() {
      DismissKeyboard();

      this.setState({ signupProgress: true });


      try {
          //await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
          const response = await api('signup', 'POST', { email: this.state.email, password: this.state.password });

          this.setState({ response: "account created" });

          if (response.success) Actions.home();
          else this.setState({ response: response.message });

     } catch (error) {
          this.setState({ response: error.toString() })
      }

      this.setState({ signupProgress: false })

    }

    async login() {
        this.setState({ loginProgress: true });

        DismissKeyboard();

        try {
          //await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
          const response = await api('login', 'POST', { email: this.state.email, password: this.state.password });
          console.log('[Login Response]', response)
          if (response.success) Actions.home();
          else this.setState({ response: response.message })

        } catch (error) {
          this.setState({ response: error.toString() })
        }

        this.setState({ loginProgress: false });

    }

    render() {
      return (
        <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
            <View style={styles.container}>
                <View style={styles.formGroup}>

                    <Image
                        style={styles.logo}
                        source={require('../Img/BEMOSS_logo.png')}
                    />

                    <View style ={styles.emailInput}>
                        <Item regular>
                           <Icon active name='mail' />
                           <Input
                               placeholder='email'
                               autoCorrect={false}
                               autoCapitalize="none"
                               type="email"
                               style={{ height: 40 }}
                               onChangeText={ email => this.setState({ email }) }
                           />
                        </Item>
                    </View>

                    <View style ={styles.passwordInput}>
                        <Item regular>
                            <Icon active name='lock' />
                            <Input
                                placeholder='password'
                                autoCorrect={false}
                                autoCapitalize="none"
                                type="password"
                                secureTextEntry
                                style={{ height: 40 }}
                                onChangeText={ password => this.setState({ password }) }
                            />
                        </Item>
                    </View>

                    <View style={styles.submit}>
                        <Button
                            onPress={this.login}
                            style={styles.buttons}
                            textStyle={{ fontSize: 18 }}
                            isLoading={this.state.loginProgress}
                        >
                          Login
                        </Button>
                    </View>

                </View>

                <View>
                  <Text style={styles.response}>{this.state.response}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
      );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: '80%',
        height: 70,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 40
    },
    emailInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    passwordInput: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    formGroup: {
        padding: 50
    },
    title: {
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        opacity: 0.8,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd'
    },
    submit: {
        paddingTop: 30
    },
    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    }
});
