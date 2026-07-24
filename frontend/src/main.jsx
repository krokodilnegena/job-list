import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { OpenProvider } from './context/OpenContext.jsx'
import { LanguageProvider } from './context/LenguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <LanguageProvider>
        <OpenProvider>
          <App />
        </OpenProvider>
      </LanguageProvider>
    </StrictMode>
  </BrowserRouter>,
)
