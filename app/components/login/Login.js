import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, Alert, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import Button from '../common/Button';
import Input from '../common/Input';
import Title from '../common/Title';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, checkUser } from '../../actions/AuthActions';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        user: ''
    };

    componentDidMount() {
        setTimeout(() => { this.props.checkUser() }, 300)
    }

    onChangeUser = text => {
        this.setState({
            user: text
        });
    };

    onPressLogin = () => {
        if (this.state.user.length > 2) {
            this.props.loginUser(this.state.user)
        } else {
            this.errorAlert();
        }
    };

    errorAlert() {
        Alert.alert(
            'Warning',
            'Your username must be longer than 2 characters.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    };

    renderButton() {
        if (this.props.auth.loading) {
            return (
                <ActivityIndicator
                    style={{ marginTop: 12 }}
                    animating={true}
                    size='large'
                    color='rgba(255,255,255,1)' />
            );
        } else {
            return (
                <Button textButton="Login" onPress={this.onPressLogin.bind(this)} />
            );
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>
                    <Title title="Leossage" />
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../images/logo.jpg')} />
                        <Text style={styles.subtitle} > An app made for Leossage {"\n"} using React Native</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <Input placeholder="Username" onChange={this.onChangeUser.bind(this)} value={this.state.user} />
                        <Text>{this.props.auth.errorLoging}</Text>
                        {this.renderButton()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 0.3,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    formContainer: {
        flex: 1,
        marginStart: 24,
        marginEnd: 24
    },
    activityIndicatorContainer: {
        marginTop: 12,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitle: {
        width: 160,
        marginTop: 12,
        color: 'white',
        textAlign: 'center',
        opacity: 0.9
    }
})

const mapStateToProps = state => ({
    auth: state.auth
});

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loginUser: loginUser,
        checkUser: checkUser
    }, dispatch)
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
    // { loginUser, checkUser }
)(Login);
