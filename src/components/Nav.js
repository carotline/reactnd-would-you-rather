import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser'
import { history } from '../utils/history';


class Nav extends React.Component {
  handleLogout = () => {
    console.log('handle Logout');
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
        </ul>
        {!!authedUser &&
          <div><button onClick={this.handleLogout}> Logout</button>{authedUser}</div>}
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
export default connect(mapStateToProps)(Nav)