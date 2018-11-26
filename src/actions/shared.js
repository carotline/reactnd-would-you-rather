import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receivePolls } from '../actions/polls'
import { setAuthedUser } from '../actions/authedUser'

//const AUTHED_ID = 'sarahedo'
let user = JSON.parse(localStorage.getItem('user'));
const AUTHED_ID = user ? user : null
export function handleInitialData () {
    return (dispatch) => {
      //dispatch(showLoading())
      return getInitialData()
        .then(({ users, polls }) => {
          dispatch(receiveUsers(users))
          dispatch(receivePolls(polls))
          dispatch(setAuthedUser(AUTHED_ID))
          //dispatch(hideLoading())
        })
    }
}