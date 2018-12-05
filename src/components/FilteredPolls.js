import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formatPoll } from '../utils/helper'
import UnansweredPoll from './UnansweredPoll'
import AnsweredPoll from './AnsweredPoll'


class FilteredPolls extends Component {
  render () {
  const {isunanswered, id} = this.props
  //const {filter} = this.props.location.state
  console.log('isunanswered',isunanswered)
  console.log(this.props.match.params)
  return (
    <div>Filtered
    {isunanswered ? 
      <UnansweredPoll id={id} /> :<AnsweredPoll id={id} />}
    </div>
  )
}
}
function mapStateToProps ({ authedUser, polls, users }, props) {
  console.group("mapStateToProps")
  const { id } = props.match.params
  console.log('propsMatch', id)
  const poll = polls[id]  
  let state = {} 
  if (!!poll) {
      const formatedPoll = formatPoll(poll, users[poll.author], authedUser)
      if(!!formatedPoll && !!formatedPoll.optionOne && !!formatedPoll.optionTwo) {
        const isunanswered = (!formatedPoll.optionOne.hasVoted && !formatedPoll.optionTwo.hasVoted) ? true : false
        state =  {
          id,
          isunanswered: isunanswered
        }
      }
  }
  return state
}

//const { id } = props.match.params


export default connect(mapStateToProps)(FilteredPolls) 