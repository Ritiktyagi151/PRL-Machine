import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WebsiteSuspendedPage from './WebsiteSuspendedPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <WebsiteSuspendedPage />
  </StrictMode>,
)
