import React, { Component } from 'react'
import { connect } from 'react-redux'
//import Poll from './Poll'

class PollList extends Component {
    render() {
      return (
        <div>
          <h3 className='center'>PollList here</h3>

        </div>
      )
    }
  }
   function mapStateToProps ({ polls }) {
    return {
      pollIds: Object.keys(polls)
        .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    }
  }
   export default connect(mapStateToProps)(PollList) 