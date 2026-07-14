import { useContext } from 'react'

import { MotionPreferencesContext } from '../core/motionPreferencesContext'
import { readMotionPreferencesSnapshot } from '../core/motionPreferences'

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext) ?? readMotionPreferencesSnapshot()
}
