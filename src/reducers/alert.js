import { ALERT_LOGIN } from '../actions/alert'
import { ALERT_CLEAR } from '../actions/alert'

 export default function alert (state = null, action) {
  switch (action.type) {
    case ALERT_LOGIN :
      return action.message
    case ALERT_CLEAR :
    console.log('alertClear')
      return null
    default :
      return state
  }
} 