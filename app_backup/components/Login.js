import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    login() {
        this.props.login(this.state.username).then(() => {
            if (this.props.error) {
                alert(this.props.error)
            } else {
                alert(this.props.username + ' success logged in')
            }
        })
    }
    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} size='large' color='rgba(255,255,255,1)' />
                </View>
            );
        } else {
            return (
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../images/logo.jpg')} />
                            <Text style={styles.title} > An app made for Leossage {"\n"} using React Native</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <StatusBar barStyle='light-content' />
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                keyboardType='default'
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={styles.input} />
                            <TouchableOpacity style={styles.touchableContainer} onPress={() => this.login()}>
                                <Text style={styles.touchable}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading,
    userData: state.auth.userData,
    error: state.auth.error
})

const mapDispatchToProps = (dispatch) => ({
    login: (username) => dispatch(actions.login({ username }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 0.5,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        width: 160,
        marginTop: 16,
        color: 'white',
        textAlign: 'center',
        opacity: 0.9
    },
    formContainer: {
        flex: 1,
        marginStart: 24,
        marginEnd: 24
    },
    input: {
        height: 40,
        backgroundColor: '#5cace2',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    touchableContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    touchable: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700'
    },
    activityIndicatorContainer: {
        backgroundColor: "#3498db",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})