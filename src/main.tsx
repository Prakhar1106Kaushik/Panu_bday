import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimization: Defer non-critical work
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Any non-critical initialization can go here
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

