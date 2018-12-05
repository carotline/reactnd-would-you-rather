import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/polls'

class NewPoll extends Component {
    state = {
      optionOne:"",
      optionTwo:""
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
      const { dispatch, authedUser } = this.props

      dispatch(handleAddPoll({optionOne, optionTwo, authedUser}))
    }
    render() {
      const { optionOne, optionTwo } = this.state
      return (
        <div>
          <h3 className='center'>Create New Question</h3>
          <p>Complete the question:</p>
          <p>Would you rather...</p>
          <form onSubmit={this.handleSubmit}> 
            <input 
              placeholder="Enter Option 1"
              name="optionOne"
              value={optionOne}
              onChange={this.handleChange}
              className='textarea'
              maxLength={280} />
            <p>or</p>
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
    }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(NewPoll) 