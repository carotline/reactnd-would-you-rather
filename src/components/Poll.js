import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll } from '../utils/helper'
import { Link, withRouter } from 'react-router-dom'

class Poll extends Component {
  render() {
    const {poll, id, pollFilter} = this.props
    return (
      <div>
        <h2 className="poll-author">{poll.name} ask:</h2>
        <div className="poll-avatar">
          <img src={poll.avatar} alt={poll.name} />
        </div>
        <div className="poll-details">
          <h3 className='would-you-title'>Would You Rather...</h3>
          <p>{poll.optionOne.text}</p>
          <Link className="poll-detail-link" 
                to={{pathname: `/questions/${id}`, state: { pollFilter }}}>
            View Poll
          </Link>
        </div>
      </div>
    )
  }
}
function mapStateToProps ({authedUser, users, polls}, {id}) {
  const poll = polls[id]
  return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null
  }
}
export default withRouter(connect(mapStateToProps)(Poll))