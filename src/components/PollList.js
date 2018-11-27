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
              unansewred questions
          </button>
          <button 
            value='answered' 
            onClick={this.handleFilter}
            className={'btn-filter ' + filter === 'answered' ? 'active' : ''}>
              ansewred questions
          </button>
          <ul>
            {filteredPollIds.map((id)=> (
                <li key={id}>
                  <Poll filter={filter} id={id} />
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
      users,
      polls,
      authedUser,
      orderedAnsewred,
      orderedUnansewred
    }
  }
   export default connect(mapStateToProps)(PollList) 