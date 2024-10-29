import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { getItem } from './utils/persistenceUtils'
import { defaultsHeadersAxios } from './services/api'
import { TOKEN_KEY } from './utils/constants'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const token = getItem(TOKEN_KEY)

defaultsHeadersAxios(token || '')
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
