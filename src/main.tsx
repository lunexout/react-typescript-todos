import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={5000}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)
