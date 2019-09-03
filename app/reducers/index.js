import { combineReducers } from 'redux';
import auth from './AuthReducer';
import messages from './MessagesReducer'

export default combineReducers({
    auth: auth,
    messages: messages
});