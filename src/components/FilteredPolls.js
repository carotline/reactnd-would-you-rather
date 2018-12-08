import React, { Component } from 'react';
import { connect } from 'react-redux'
import UnansweredPoll from './UnansweredPoll'
import AnsweredPoll from './AnsweredPoll'
import NotFound from './NotFound'
import { history } from '../utils/history';


class FilteredPolls extends Component {
  render () {
    //const {isunanswered} = this.props
    if (!history.location.state) {
      return <NotFound />
    } 
    const pollFilter = history.location.state.pollFilter 
    const id = this.props.match.params
    //const {filter} = this.props.location.state
    console.log(this.props.match.params)
    console.log("FILTEREDRENDERID",id)
    return (
      <div>
      {pollFilter === 'unanswered' ? 
        <UnansweredPoll id={id} /> :<AnsweredPoll id={id} />}
      </div>
    )
  }
}

export default connect()(FilteredPolls) 