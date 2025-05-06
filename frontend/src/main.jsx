import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import * as ServiceWorker from './serviceWorker.js'
import { StateProvider } from './components/StateProvider.jsx'
import reducer, { initialState } from './components/reducer.jsx'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  
  document.getElementById('root') 
)
ServiceWorker.unregister();
