import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import Login from './components/login/Login';
import Home from './components/home/Home';
// hideNavBar
const RouterComponent = () => (
    <Router>
        <Stack key="root" panHandlers={null}>
            <Scene key="login" component={Login} title="Login" />
            <Scene key="app" component={Home} backTitle="Logout" title="" onBack={() => {
                firebase.auth().signOut();
                Actions.pop();
            }} />
        </Stack>
    </Router>
);

export default RouterComponent;