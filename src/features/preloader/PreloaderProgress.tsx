type PreloaderProgressProps = {
  progress: number
}

function formatProgress(progress: number) {
  return String(Math.round(progress * 100)).padStart(3, '0')
}

export function PreloaderProgress({ progress }: PreloaderProgressProps) {
  return (
    <div className="preloader__progress" aria-hidden="true">
      <div className="preloader__progress-track">
        <div className="preloader__progress-line" data-preloader-line style={{ transform: `scaleX(${progress})` }} />
      </div>
      <span className="preloader__progress-value">{formatProgress(progress)}</span>
    </div>
  )
}
