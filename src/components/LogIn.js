import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { alertClear } from '../actions/alert'
import logo from '../logo.svg';




class Login extends Component {
  constructor(props) {
    super(props);
    console.log('LoginLocation',this.props.location);

  }
  state = {
    selectedOption: "select"
  }

  handleChange = (event) => {
    this.setState({selectedOption: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedOption } = this.state
    const {authedUser, dispatch} = this.props

    dispatch(alertClear())
    dispatch(setAuthedUser(selectedOption))
    localStorage.setItem('user', JSON.stringify(selectedOption))

    console.log('afterDispatch',authedUser)
  }
  render() {
    const { users, location} = this.props
    const { selectedOption } = this.state

    return (
      <div>
        
        <h3 className='center'>Login</h3>
        {logo}
        <form className="login-selector" onSubmit={this.handleSubmit}>
          <select value={selectedOption} onChange={this.handleChange}>
            <option value="select">Select user...</option>
              {Object.keys(users).map(key => {
                return (
                  <option key={users[key].id} value={users[key].id}>{users[key].name}</option>
                )
              })}
          </select>
          <button
            className='btn'
            type='submit'
            disabled={selectedOption === 'select'}>
              Submit
          </button>
        </form>

      </div>
    )
  }
}

function mapStateToProps ({users, authedUser}) {
  return {
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Login)