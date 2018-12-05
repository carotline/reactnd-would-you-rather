export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ANSWER = 'USER_ANSWER'
export const USER_ADD_POLL = 'USER_ADD_POLL'

export function receiveUsers (users) {
    return {
      type: RECEIVE_USERS,
      users,
    }
} 

export function userAnswer ({ authedUser, qid, answer }) {
  return {
    type: USER_ANSWER,
    authedUser,
    qid,
    answer
  }
} 

export function userAddPoll (info) {
  const poll = info.poll
  return {
    type: USER_ADD_POLL,
    poll
  }
} 