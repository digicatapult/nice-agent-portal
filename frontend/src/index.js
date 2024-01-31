import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import GlobalFonts from './assets/fonts/fonts'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
    <GlobalFonts />
  </React.StrictMode>
)
