import { siteNavigation } from '../../data/siteContent'

export function Header() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="SUBEROS, volver al inicio">
          <img
            src="/branding/suberos-icon-192.png"
            width="40"
            height="40"
            alt=""
            aria-hidden="true"
          />
          <span>SUBEROS</span>
        </a>
        <nav aria-label="Navegacion principal">
          <ul className="site-header__nav">
            {siteNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
