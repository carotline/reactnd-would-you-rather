import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll } from '../utils/helper'
import { Link, withRouter } from 'react-router-dom'


class Poll extends Component {
    render() {
      console.log('POLL', this.props.poll)
      const {poll, id} = this.props
      return (
        <div>
          <h2>{poll.name}</h2>
          <h3 className='center'>Would You Rather</h3>
          <img src={poll.avatar}></img>
          <p>{poll.optionOne.text}</p>
          <Link to={`/questions/${id}`}>
              View Poll
            </Link>



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