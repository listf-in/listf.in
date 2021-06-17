import React from 'react'
import ReactDOM from 'react-dom'
import App from './ts/App'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain='dev-v191p81s.us.auth0.com'
    clientId='QBalhUxGPNfswO2xamB6QHoDx3QXdRFa'
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)
