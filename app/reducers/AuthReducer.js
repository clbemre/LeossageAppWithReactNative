import {
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_CHECK_USER,
  AUTH_CHECK_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  errorLoging: '',
  errorCreating: '',
  loading: false,
  user: null
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CHECK_USER:
      return { ...state, ...INITIAL_STATE, loading: false, user: action.payload };
      break;
    case AUTH_CHECK_USER_SUCCESS:
      return { ...state, loading: false, error: '' };
      break;
    case AUTH_LOGIN_USER:
      return { ...state, ...INITIAL_STATE, loading: true, user: action.payload };
      break;
    case AUTH_LOGIN_USER_SUCCESS:
      return { ...state, loading: false, error: '' };
      break;
    case AUTH_LOGIN_USER_FAIL:
      return { ...state, errorLoging: 'Login failed! Please check the credentials!', loading: false };
      break;
    default:
      return state;
  }
};

export default auth;