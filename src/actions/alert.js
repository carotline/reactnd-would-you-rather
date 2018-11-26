export const ALERT_LOGIN = 'ALERT_LOGIN'
export const ALERT_CLEAR = 'ALERT_CLEAR'

export function alertLogin (message) {
    return {
      type: ALERT_LOGIN,
      message,
    }
}

export function alertClear () {
  return {
    type: ALERT_CLEAR
  }
} 