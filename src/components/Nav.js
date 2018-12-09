import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser'
import { history } from '../utils/history';
import { withRouter } from 'react-router-dom'

class Nav extends React.Component {
  handleLogout = () => {
    this.props.dispatch(unsetAuthedUser());
    history.push('/')
  }
  render () {
    const {authedUser} = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {!!authedUser && authedUser !== 'logout' &&
            <li className="user-log-box">
              <button className="logout" onClick={this.handleLogout}> 
                Logout
              </button>
              <span className="log-username">
                {authedUser}
              </span>
            </li>}
        </ul>
      </nav>
    )
  }
} 
function mapStateToProps ({users, authedUser}) {
  return {
    users,
    authedUser
  }
}
export default withRouter(connect(mapStateToProps)(Nav))