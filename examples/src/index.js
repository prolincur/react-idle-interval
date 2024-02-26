import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { useIdleInterval } from 'react-idle-interval'

const root = ReactDOM.createRoot(document.getElementById('root'))

function App () {
  useIdleInterval({
    callback: () => console.log('callback called'),
    interval: 100, // ms
    idleTimer: 1000, // ms
    onIdle: () => console.log('called on idle'),
    onActive: () => console.log('called on active'),
  })
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
