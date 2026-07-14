type SectionHeaderProps = {
  eyebrow: string
  title: string
  body?: string
}

export function SectionHeader({ eyebrow, title, body }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="section-header__body">{body}</p> : null}
    </div>
  )
}
