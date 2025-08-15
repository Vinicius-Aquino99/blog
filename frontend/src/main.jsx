import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // 👈 importar o HashRouter
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter> {/* 👈 Envolver App aqui */}
      <App />
    </HashRouter>
  </StrictMode>
)
