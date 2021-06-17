import React from 'react'
import ReactDOM from 'react-dom'
import App from './ts/App'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)
