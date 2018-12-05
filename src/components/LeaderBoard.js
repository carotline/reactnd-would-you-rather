import React, { Component } from 'react'
import { connect } from 'react-redux'
import Leader from './Leader'


class LeaderBoard extends Component {
  render() {
    const { leaderIds } = this.props
    return (
      <div>
        <h3 className='center'>LeaderBoard</h3>
        <ul>
          {leaderIds.map((id)=> (
            <li key={id}>
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

export default connect(mapStateToProps)(LeaderBoard) 