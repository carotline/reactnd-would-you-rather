import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatBoard } from '../utils/helper'


class Leader extends Component {
  render() {
    const {lead} = this.props
    return (
      <div className="leader-wrap">
        <div className="leader-avatar">
          <img src={lead.avatar} alt={lead.name}></img>
        </div>
        <div className="leader-details">
          <h2 className='center'>{lead.name}</h2>
          <p>Answered Questions {lead.answered}</p>
          <hr />
          <p>Created Questions {lead.questions}</p>
        </div>
        <div className="leader-score">
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