import { combineReducers } from 'redux'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'
import users from './users'
import polls from './polls'
import alert from './alert'

export default combineReducers({
    authedUser,
    users,
    polls,
    alert,
    loadingBar: loadingBarReducer
  }) 