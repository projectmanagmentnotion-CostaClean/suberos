import type { WorkShowcaseDiscipline } from '../../data/workShowcase'

type WorkProjectMediaProps = {
  item: WorkShowcaseDiscipline
}

export function WorkProjectMedia({ item }: WorkProjectMediaProps) {
  return (
    <figure className="work-media" data-discipline={item.id}>
      <div className="work-media__texture" aria-hidden="true" />
      <div className="work-media__grid" aria-hidden="true" />
      <div className="work-media__glow" aria-hidden="true" />
      <div className="work-media__rings" aria-hidden="true" />
      <div className="work-media__content">
        <p className="work-media__label">{item.mediaLabel}</p>
        <img alt="" className="work-media__logo" height="256" src="/branding/suberos-logo-symbol.webp" width="247" />
        <p className="work-media__headline">{item.headline}</p>
      </div>
      <figcaption className="work-media__caption">{item.mediaCaption}</figcaption>
    </figure>
  )
}
