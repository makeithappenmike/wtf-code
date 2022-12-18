import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Aggregate the entire App as a component for rendering to the root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
