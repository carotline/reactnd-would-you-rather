import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { alertClear } from '../actions/alert'
import logo from '../logo.svg';
import { withRouter } from 'react-router-dom'

class Login extends Component {
  state = {
    selectedOption: "select"
  }
  handleChange = (event) => {
    this.setState({selectedOption: event.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedOption } = this.state
    const { dispatch } = this.props

    dispatch(alertClear())
    dispatch(setAuthedUser(selectedOption))
    localStorage.setItem('user', JSON.stringify(selectedOption))
  }
  render() {
    const { users } = this.props
    const { selectedOption } = this.state
    return (
      <div className="box login-box">
        <h2 className='center login-title'>Welcome to the Would You Rather App!</h2>
        <div className="logo">
          <object className="App-logo" type="image/svg+xml" data={logo}>React Logo</object>
        </div>
        <p>Please Sign In To Continue</p>
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
function mapStateToProps ({ users }) {
  return {
    users
  }
}
export default withRouter(connect(mapStateToProps)(Login))