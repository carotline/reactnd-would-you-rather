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
import '../App.css';


class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
        console.log('listen',history);
        // clear alert on location change
       // dispatch(alertActions.clear());
    });
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser, alert } = this.props
    console.log('history', history);
    console.log('App Page, Authed', this.props.authedUser);
    return (

      <Router history={history}>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {!!alert && <div className='error'>{alert}</div>} 
            {this.props.loading === true
              ? null
              : <div> 
                  <Switch>
                    {authedUser !== null ?
                      <Route path='/' exact component={PollList} /> : 
                      <Route path='/' exact component={LogIn} /> }
                    <PrivateRoute path='/questions/:id' component={FilteredPolls} />
                    <PrivateRoute path='/add' component={NewPoll} />
                    <PrivateRoute path='/leaderboard' component={LeaderBoard} />
                    <Route component={NotFound} />
                  </Switch>
                </div>}
          
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({users, authedUser, alert}) {
  return {
    loading: users === null,
    authedUser,
    alert
  }
}
export default connect(mapStateToProps)(App)
