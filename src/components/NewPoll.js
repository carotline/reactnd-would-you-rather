import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/polls'
import { Redirect, withRouter } from 'react-router-dom'

class NewPoll extends Component {
  state = {
    optionOne:"",
    optionTwo:"",
    toHome: false
  }
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(() => ({
      [name]: value
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch, authedUser, id } = this.props

    dispatch(handleAddPoll({optionOne, optionTwo, authedUser}))

    this.setState(() => ({
      optionOne:"",
      optionTwo:"",
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const { loadingBar } = this.props
    if (loadingBar.default === 0) {
      if (toHome === true) {
        return <Redirect to='/' />
      }
      return (
        <div className="box new-question-container">
          <h3 className='center title-question'>Create New Question</h3>
          <p>Complete the question:</p>
          <p className="would-you-rather-text">Would You Rather...</p>
          <form onSubmit={this.handleSubmit}> 
            <input 
              placeholder="Enter Option 1"
              name="optionOne"
              value={optionOne}
              onChange={this.handleChange}
              className='textarea'
              maxLength={280} />
            <p className="center or-text">or</p>
            <input 
              placeholder="Enter Option 2"
              name="optionTwo"
              value={optionTwo}
              onChange={this.handleChange}
              className='textarea'
              maxLength={280}/>
            <button
              className='btn'
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}>
              Submit</button>
          </form>
        </div>
      )
    } else {return null}
  }
}
function mapStateToProps ({authedUser, loadingBar}) {
  return {
    loadingBar,
    authedUser
  }
}
export default withRouter(connect(mapStateToProps)(NewPoll))