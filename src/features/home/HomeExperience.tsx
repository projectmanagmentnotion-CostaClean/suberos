import { useState } from 'react'

import { HomePage } from './HomePage'
import { Preloader } from '../preloader/Preloader'

export function HomeExperience() {
  const [experienceReady, setExperienceReady] = useState(false)

  return (
    <>
      <HomePage />
      {!experienceReady ? <Preloader onComplete={() => setExperienceReady(true)} /> : null}
    </>
  )
}
