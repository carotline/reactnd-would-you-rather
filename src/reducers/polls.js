import { RECEIVE_POLLS, ANSWER_POLL } from '../actions/polls'
import { ADD_POLL } from '../actions/polls'

export default function polls (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POLLS :
      return {
        ...state,
        ...action.polls
      }
    case ANSWER_POLL :
      return {
        ...state,
          [action.qid]: {
            ...state[action.qid],
            [action.answer]: {
              ...state[action.qid][action.answer],
              votes: state[action.qid][action.answer].votes.concat([action.authedUser])
            }
          }
    
      }
      case ADD_POLL :
      console.log("STATE",state)
          console.log("ACTION",action)
        return {
          //arr: state.arr.concat(action.newItem)
          ...state,
          ...state[action.poll.id] = Object.assign({}, {[action.poll.id]:action.poll}),
        }
      default :
        return state
    }
}