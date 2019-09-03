import { FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE, FETCHING_MESSAGES, ADD_NEW_MESSAGE } from '../actions/types';

const initialState = {
  messages: [],
  isFetching: false,
  error: false
}

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_MESSAGES:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messages: action.payload
      }
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
      case ADD_NEW_MESSAGE:
        const mess = [...state.messages]
        mess.push(action.payload)
          return {
        messages: mess,
        isFetching: false,
        error: false
      }
    default:
      return state
  }
}