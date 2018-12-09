import React, { Component } from 'react';
import { connect } from 'react-redux'
import UnansweredPoll from './UnansweredPoll'
import AnsweredPoll from './AnsweredPoll'
import NotFound from './NotFound'
import { formatPoll } from '../utils/helper'

class FilteredPolls extends Component {
  render () {
    const { poll, id } = this.props
    if (poll === null) {
      return <NotFound />
    }
    const isUnAnswered = poll.optionOne.hasVoted === false 
            && poll.optionTwo.hasVoted === false ?
            true : false
    return (
      <div>
        {isUnAnswered ? 
          <UnansweredPoll id={id} /> :<AnsweredPoll id={id} />}
      </div>
    )
  }
}
function mapStateToProps ({authedUser, users, polls}, props) {
  const id = props.match.params.id
  const poll = polls[id]
  return {
    id,
    poll : poll ? formatPoll(poll, users[poll.author], authedUser) : null
  }
}
export default connect(mapStateToProps)(FilteredPolls) 