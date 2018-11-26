import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { alertLogin } from '../actions/alert'

/*
export const PrivateRoute = ({ component: Component, ...rest }) => (
  this.props.dispatch(alert('Please Login'))
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: { from: props.location } }} />
    )} />
)
*/

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    const message = 'Please Login'
    if (!localStorage.getItem('user')) {
      this.props.dispatch(alertLogin(message))
    }

  }
  render() {
    const { component: Component, ...rest } = this.props
    return(
      
      <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: { from: props.location } }} />
    )} />

    )
  }
}

export default connect()(PrivateRoute)