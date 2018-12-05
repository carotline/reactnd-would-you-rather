import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { history } from '../utils/history';
import { userAnswer } from '../actions/users'
import { userAddPoll } from '../actions/users'
export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ANSWER_POLL = 'ANSWER_POLL'
export const ADD_POLL = 'ADD_POLL'

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  }
}

function answerPoll ({ authedUser, qid, answer }) {
  return {
    type: ANSWER_POLL,
    authedUser,
    qid,
    answer
  }
}

export function handleAnswerPoll ({authedUser, qid, answer}) {
  return (dispatch) => {
     dispatch(showLoading())
     return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => dispatch(answerPoll({authedUser, qid, answer})))
      .then(() => dispatch(userAnswer({authedUser, qid, answer})))
      .then(() => dispatch(hideLoading()))
  }
}

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}

export function handleAddPoll ({optionOne, optionTwo, authedUser}) {
  return (dispatch) => {
     dispatch(showLoading())
     return saveQuestion(
       {
        optionOneText: optionOne, 
        optionTwoText: optionTwo, 
        author: authedUser
       })
     .then((poll) => dispatch(addPoll(poll)))
     .then((poll) => dispatch(userAddPoll(poll)))
     .then(history.push('/'))
     .then(() => dispatch(hideLoading()))
  }
}

/*
authedUser, qid, answer 
export function handleToggleTweet (info) {
  return (dispatch) => {
    dispatch(toggleTweet(info))

    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(toggleTweet(info))
        alert('The was an error liking the tweet. Try again.')
      })
  }
  
}
*/