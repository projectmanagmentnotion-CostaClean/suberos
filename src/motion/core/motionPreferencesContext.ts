import { createContext } from 'react'

import { MotionPreferences } from '../types/motion.types'

export const MotionPreferencesContext = createContext<MotionPreferences | null>(null)
