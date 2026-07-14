import { MotionProfile } from '../../motion/types/motion.types'

export type CriticalAsset = {
  id: string
  kind: 'font' | 'image'
  descriptor?: string
  src?: string
}

export type PreloaderResolution = 'assets-ready' | 'session-skip' | 'timeout'
export type PreloaderPhase = 'complete' | 'exiting' | 'loading' | 'ready' | 'skipped'
export type PreloaderVariant = MotionProfile

export type PreloaderState = {
  displayProgress: number
  failedAssetIds: string[]
  forced: boolean
  loadedAssets: number
  phase: PreloaderPhase
  resolvedBy: PreloaderResolution | null
  totalAssets: number
  variant: PreloaderVariant
}
