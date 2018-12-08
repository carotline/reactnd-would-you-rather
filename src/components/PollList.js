import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'

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
      console.log("ouep",pollFilter)
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
          <ul className="poll-box-container">
            {filteredPollIds.map((id)=> (
                <li className="poll-box" key={id}>
                  <Poll pollFilter={pollFilter} id={id} />
                </li>
            ))}
          </ul>
        </div>
      )
    }
  }
  function mapStateToProps ({ polls, authedUser, users }) {
    console.log('POLLIST')
    const pollIds = Object.keys(polls)
     .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    const ansewredIds = Object.keys(users[authedUser].answers) 
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
  export default connect(mapStateToProps)(PollList) 