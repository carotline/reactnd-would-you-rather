import React from 'react';
import { history } from '../utils/history';

export const NotFound = () => (
  <div>
    <h3>No match for <code>{history.location.pathname}</code></h3>
  </div>
)
export default NotFound