import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Poll } from './Poll'
//import Poll from './Poll'

class PollList extends Component {
    state = {
      filter: 'unanswered'
    }
    handleFilter = (event) => {
      console.log('eventClick', event.target.value)
      this.setState({filter: event.target.value});
      

    }

    filterPolls = () => {
      const { filter } = this.state
      const { authedUser, polls } = this.props
      console.log('filter', filter)
      console.log('authedUserFilter', authedUser)
      console.log('pollsFilter', polls)

      if (filter === 'answered') {
        return polls.filter(
          poll =>
            poll.optionOne.votes.indexOf(authedUser) === -1 &&
            poll.optionTwo.votes.indexOf(authedUser) === -1
        );
      }

      if (filter === 'unanswered') {
        return polls.filter(
          poll =>
            poll.optionOne.votes.indexOf(authedUser) !== -1 &&
            poll.optionTwo.votes.indexOf(authedUser) !== -1
        );
      }

    }
    render() {
      const pollsFiltered = this.filterPolls()
      const { filter } = this.state
      console.log('PollList, authed', this.props.authedUser)
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
            {pollsFiltered.map((poll)=> {
              return <Poll poll={poll} filter={filter} />
            })}
          </ul>


        </div>
      )
    }
  }
   function mapStateToProps ({ polls, authedUser }) {
    return {
      polls,
      authedUser,
      pollIds: Object.keys(polls)
        .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    }
  }
   export default connect(mapStateToProps)(PollList) 