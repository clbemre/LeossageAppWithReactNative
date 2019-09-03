import React, { Component } from 'react';
import firebase from 'firebase';
import Main from './app/Main';
import { Actions } from 'react-native-router-flux';

export default class App extends Component {

  componentDidMount() {

    const config = {
      apiKey: "AIzaSyCteUeWlCNicutVuch3EVLYfEe4ZtHAMFg",
      authDomain: "leossagereactnativeapp.firebaseapp.com",
      databaseURL: "https://leossagereactnativeapp.firebaseio.com",
      projectId: "leossagereactnativeapp",
      storageBucket: "",
      messagingSenderId: "861144403852",
      appId: "1:861144403852:web:997e7802595df74a"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Main />
    );
  }
}