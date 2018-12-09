import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import { withRouter } from 'react-router-dom'

class PollList extends Component {
    state = {
      pollFilter: 'unanswered',
      filteredPollIds: this.props.orderedUnansewred
    }
    handleFilter = (event) => {
      this.setState({
        pollFilter: event.target.value,
        filteredPollIds: event.target.value === 'unanswered' ?
            this.props.orderedUnansewred : this.props.orderedAnsewred
      })
    }
    render() {
      const { pollFilter, filteredPollIds } = this.state
      return (
        <div className="box home-list-box">
          <button 
            value='unanswered' 
            onClick={this.handleFilter}
            className={pollFilter === 'unanswered' ? 'active btn-filter' : 'btn-filter'}>
              Unanswered Questions
          </button>
          <button 
            value='answered' 
            onClick={this.handleFilter}
            className={pollFilter === 'answered' ? 'active btn-filter' : 'btn-filter'}>
              Answered Questions
          </button>
          {filteredPollIds.length < 1 ? 
            <div className="no-polls center">There is no {pollFilter} questions</div> :
            <ul className="poll-box-container">
              {filteredPollIds.map((id)=> (
                <li className="poll-box" key={id}>
                  <Poll pollFilter={pollFilter} id={id} />
                </li>
              ))}
            </ul>
          }
        </div>
      )
    }
  }
  function mapStateToProps ({ polls, authedUser, users }) {
    //Get array of keys questions in proper order 
    const pollIds = Object.keys(polls)
     .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    //Get array of answered key questions 
    const ansewredIds = Object.keys(users[authedUser].answers)
    //sort and order answered and unanswered key question 
    const orderedAnsewred = []
    const orderedUnansewred = []
    pollIds.map(id => {
      if (ansewredIds.indexOf(id) > -1) {
        return orderedAnsewred.push(id)
      } else {
        return orderedUnansewred.push(id)
      }
    })
    return {
      orderedAnsewred,
      orderedUnansewred
    }
  }
  export default withRouter(connect(mapStateToProps)(PollList))