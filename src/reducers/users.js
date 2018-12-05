import { RECEIVE_USERS } from '../actions/users'
import { USER_ANSWER } from '../actions/users'
import { USER_ADD_POLL } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case USER_ANSWER :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    case USER_ADD_POLL :
      return {
        ...state,
          [action.poll.author]: {
            ...state[action.poll.author],
              questions: state[action.poll.author].questions.concat([action.poll.id])
          }
      }
    default :
      return state
  }
} 