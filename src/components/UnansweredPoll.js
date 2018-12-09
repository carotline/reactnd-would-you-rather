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
    if (poll === null) {
      return <p className="error center">This Question doesn't exist</p>
    }
    return (
      <div className="box unanswered-box">
        <h2 className='poll-author'>{poll.name} ask:</h2>
        <div className="poll-avatar">
          <img src={poll.avatar} alt={poll.name} />
        </div>
        <div className="poll-details">
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
            <button className="btn center" type="submit">Submit</button>
          </form>
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
    poll: poll ? formatPoll(poll, users[poll.author], authedUser) : null
  }
}
export default connect(mapStateToProps)(UnansweredPoll) 