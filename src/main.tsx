import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/App'
import { AppProviders } from './app/AppProviders'
import { registerMotionPlugins } from './motion/core/registerGsap'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/utilities.css'
import './styles/global.css'

registerMotionPlugins()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
