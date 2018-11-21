import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PollList from './PollList'
import Nav from './Nav'
import logo from '../logo.svg';
import '../App.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
      <div>
        <Nav />
        <PollList />
        <Route path='/' exact component={LogIn} />
        <Route path='/home' component={PollList} />
        <Route path='/questions/:id' component={Poll} />
        <Route path='/add' component={NewPoll} />
        <Route path='/leadBoard' component={LeadBoard} />
       
      </div>
      </Router>
    );
  }
}

export default connect()(App)
