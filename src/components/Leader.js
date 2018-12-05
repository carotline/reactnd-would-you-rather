import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatBoard } from '../utils/helper'


class Leader extends Component {
  render() {
    const {lead} = this.props
    return (
      <div>
        <img src={lead.avatar}></img>
        <div>
          <h2 className='center'>{lead.name}</h2>
          <p>Answered Questions {lead.answered}</p>
          <hr />
          <p>Created Questions {lead.questions}</p>
        </div>
        <div>
          <h3>Score</h3>
          <div>{lead.score}</div>
        </div>
      </div>
    )
  }
}
function mapStateToProps ({ users }, { id }) {
  const lead = users[id]
  return {
    lead: lead
    ? formatBoard(lead)
    : null
  }

}

export default connect(mapStateToProps)(Leader)