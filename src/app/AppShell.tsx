import { PropsWithChildren } from 'react'

import { SkipLink } from '../components/ui/SkipLink'
import { Footer } from '../features/footer/Footer'
import { Header } from '../features/navigation/Header'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <SkipLink href="#main-content" label="Saltar al contenido principal" />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
