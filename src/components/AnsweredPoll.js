import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll } from '../utils/helper'

class FilteredPolls extends Component {
  render() {
    const { poll } = this.props
    return (
      <div className="box answered-box">
        <h2 className='poll-author'>Asked by {poll.name}</h2>
        <div className="poll-avatar">
          <img src={poll.avatar} alt={poll.name}></img>
        </div>
        <div className="answered-details">
          <h4>Results</h4>
          <div className="option-result-box">
            <p>{poll.optionOne.text}</p>
            <div className="percent-chart">{poll.optionOne.percentage}%</div>
            <p>{poll.optionOne.votes} out of {poll.totalVotes} votes</p>
            {poll.optionOne.hasVoted && <div className="your-vote-sceal">Your vote</div>}
          </div>
          <div className="option-result-box">
            <p>{poll.optionTwo.text}</p>
            <div className="percent-chart">{poll.optionTwo.percentage}%</div>
            <p>{poll.optionTwo.votes} out of {poll.totalVotes} votes</p>
            {poll.optionTwo.hasVoted && <div className="your-vote-sceal">Your vote</div>}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, polls}, {id}) {
  const poll = polls[id]
  return {
    id: id,
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null
  }
}
export default connect(mapStateToProps)(FilteredPolls)