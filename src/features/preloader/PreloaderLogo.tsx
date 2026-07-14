type PreloaderLogoProps = {
  className?: string
}

export function PreloaderLogo({ className }: PreloaderLogoProps) {
  return (
    <div className={className}>
      <img alt="" aria-hidden="true" height="192" src="/branding/suberos-icon-192.png" width="192" />
      <span>SUBEROS</span>
    </div>
  )
}
