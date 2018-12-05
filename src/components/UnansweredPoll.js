import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll } from '../utils/helper'
import { handleAnswerPoll } from '../actions/polls'

class UnansweredPoll extends Component {
    state = {
      selectedOption: 'optionOne'
    }
    handleOptionChange = (event) => {
      this.setState({
        selectedOption: event.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const { dispatch, id, authedUser } = this.props
      const { selectedOption } = this.state
      dispatch(handleAnswerPoll({
        authedUser,
        qid: id,
        answer: selectedOption,
      }))

    }
    render() {
      const { poll } = this.props
      return (
        <div className="unanswered-poll-box">
          <h3 className='center'>{poll.name} ask:</h3>
          <img src={poll.avatar}></img>
          <div>
            <h2>Would You Rather...</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input 
                  type="radio" 
                  value='optionOne' 
                  checked={this.state.selectedOption === 'optionOne'}
                  onChange={this.handleOptionChange} /> 
                    {poll.optionOne.text}<br />
              </label>
              <label>
                <input 
                  type="radio" 
                  value='optionTwo'
                  checked={this.state.selectedOption === 'optionTwo'}
                  onChange={this.handleOptionChange} /> 
                    {poll.optionTwo.text}<br />
              </label>
              <button type="submit">Submit</button>
            </form>
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
export default connect(mapStateToProps)(UnansweredPoll) 