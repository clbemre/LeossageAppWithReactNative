import { FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE, FETCHING_MESSAGES, ADD_NEW_MESSAGE } from '../actions/types';

export function fetchMessages() {

    return (dispatch) => {
        dispatch(getMessageList())

        return (fetch('https://jsonblob.com/api/jsonBlob/4f421a10-5c4d-11e9-8840-0b16defc864d'))
            .then(res => res.json())
            .then(json => {
                 console.log(json)
                return (dispatch(getMessageListSuccess(json)))
            })
            .catch(err => dispatch(getMessageListFailure(err)))
    }
}

function getMessageList() {
    return { type: FETCHING_MESSAGES }
}

function getMessageListSuccess(messages) {
    return {
        type: FETCH_MESSAGES_SUCCESS,
        payload: messages
    }
}

export function addNewMessage(message) {
    return {
        type: ADD_NEW_MESSAGE,
        payload: message
    }
}

function getMessageListFailure() {
    return {
        type: FETCH_MESSAGES_FAILURE
    }
}