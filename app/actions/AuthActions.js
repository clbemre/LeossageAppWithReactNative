import {
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_CHECK_USER,
    AUTH_CHECK_USER_SUCCESS
} from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const loginUser = (username) => {
    return dispatch => {
        dispatch({ type: AUTH_LOGIN_USER });
        email = username + '@leossage.com';
        password = 'parola1234';

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => checkUser(dispatch))
            .catch((e) => {
                console.log("error ", e);
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(user => checkUser(dispatch))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};

// .catch(user => loginUserFail(dispatch));
const loginUserSucces = (dispatch, user) => {
    console.log("ikimi Login Suc")
    dispatch({
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: user
    });
    openHomePage(dispatch, user.username)
};

const openHomePage = (dispatch, username) => {
    setTimeout(() => { Actions.app({ title: username }); }, 250)
}

const loginUserFail = dispatch => {
    dispatch({ type: AUTH_LOGIN_USER_FAIL });
};

export const checkUser = (dispatch) => {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_CHECK_USER });
        const localUser = firebase.auth().currentUser
        if (localUser) {

        }
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                checkUserSucces(dispatch, firebase.auth().currentUser.email.split('@')[0].toUpperCase())
            }
        });
    };
};

const checkUserSucces = (dispatch, user) => {
    console.log("ikimi Check Suc")
    dispatch({
        type: AUTH_CHECK_USER_SUCCESS,
        payload: user
    });
    openHomePage(dispatch, user)
}; 
