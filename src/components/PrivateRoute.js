import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { alertLogin } from '../actions/alert'

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    const message = 'Please Login'
    //If user not Login send Alert message
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