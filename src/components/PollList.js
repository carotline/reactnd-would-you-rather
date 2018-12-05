import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'

class PollList extends Component {
    state = {
      filter: 'unanswered',
      filteredPollIds: this.props.orderedUnansewred
    }
    handleFilter = (event) => {
      this.setState({
        filter: event.target.value,
        filteredPollIds: event.target.value === 'unanswered' ?
        this.props.orderedUnansewred : this.props.orderedAnsewred
      })
    }
    render() {
      const { filter, filteredPollIds } = this.state
      return (
        <div>
          <h3 className='center'>PollList here</h3>
          <button 
            value='unanswered' 
            onClick={this.handleFilter}
            className={'btn-filter ' + filter === 'unanswered' ? 'active' : ''}>
              unanswered questions
          </button>
          <button 
            value='answered' 
            onClick={this.handleFilter}
            className={'btn-filter ' + filter === 'answered' ? 'active' : ''}>
              answered questions
          </button>
          <ul>
            {filteredPollIds.map((id)=> (
                <li key={id}>
                  <Poll id={id} />
                </li>
            ))}
          </ul>
        </div>
      )
    }
  }
  function mapStateToProps ({ polls, authedUser, users }) {
    const pollIds = Object.keys(polls)
     .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    const ansewredIds = Object.keys(users[authedUser].answers) 
    const orderedAnsewred = []
    const orderedUnansewred = []
     
    pollIds.map(id => {
      if (ansewredIds.indexOf(id) > -1) {
        orderedAnsewred.push(id)
      } else {
        orderedUnansewred.push(id)
      }
    })
    return {
      orderedAnsewred,
      orderedUnansewred
    }
  }
  export default connect(mapStateToProps)(PollList) 