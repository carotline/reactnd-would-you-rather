import React, { Component } from 'react'
import { connect } from 'react-redux'
import Leader from './Leader'
import { withRouter } from 'react-router-dom'

class LeaderBoard extends Component {
  render() {
    const { leaderIds } = this.props
    return (
      <div>
        <ul className="leader-list-container">
          {leaderIds.map((id)=> (
            <li className="leader-box box" key={id}>
              <Leader id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  const AscLeaderIds = Object.keys(users)
    .sort((a,b) => {
      const bLength = (Object.keys(users[b].answers).length + users[b].questions.length)
      const aLength = (Object.keys(users[a].answers).length + users[a].questions.length)
      return bLength - aLength
    })
  return {
    leaderIds: AscLeaderIds
  }
}
export default withRouter(connect(mapStateToProps)(LeaderBoard)) 