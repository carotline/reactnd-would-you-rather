import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { history } from '../utils/history';
import { handleInitialData } from '../actions/shared'
import PollList from './PollList'
import LogIn from './LogIn'
import NewPoll from './NewPoll'
import LeaderBoard from './LeaderBoard'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import FilteredPolls from './FilteredPolls'
import Nav from './Nav'
import '../css/App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser, alert } = this.props
    return (
      <Router history={history}>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
            {!!alert && <div className='error center'>{alert}</div>} 
            {this.props.loading === true
              ? null
              : <div className="container"> 
                  <Switch>
                    {authedUser !== 'logout'?
                      <Route path='/' exact component={PollList} /> : 
                      <Route path='/' exact component={LogIn} /> }
                    <PrivateRoute path='/questions/:id' component={FilteredPolls} />
                    <PrivateRoute path='/add' component={NewPoll} />
                    <PrivateRoute path='/leaderboard' component={LeaderBoard} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps ({authedUser, alert}) {
  return {
    loading: authedUser === null,
    authedUser,
    alert
  }
}
export default connect(mapStateToProps)(App)
