import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll } from '../utils/helper'

class FilteredPolls extends Component {
    render() {
      const { poll } = this.props
      return (
        <div>
          <h3 className='center'>Asked by {poll.name}</h3>
          <img src={poll.avatar}></img>
          <div>
            <h4>Results</h4>
            <div className="option-result-box">
              <p>{poll.optionOne.text}</p>
              <div className="percent-chart">{poll.optionOne.percentage}%</div>
              <p>{poll.optionOne.votes} out of {poll.totalVotes} votes</p>
              {poll.optionOne.hasVoted && <div className="your-vot-sceal">Your vote</div>}
            </div>
            <div className="option-result-box">
              <p>{poll.optionTwo.text}</p>
              <div className="percent-chart">{poll.optionTwo.percentage}%</div>
              <p>{poll.optionTwo.votes} out of {poll.totalVotes} votes</p>
              {poll.optionTwo.hasVoted && <div className="your-vot-sceal">Your vote</div>}
            </div>
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
export default connect(mapStateToProps)(FilteredPolls)