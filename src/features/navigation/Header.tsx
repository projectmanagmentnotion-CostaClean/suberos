import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { homeAnchors } from '../../app/routes'
import gsap from 'gsap'

import { Cluster } from '../../components/layout/Cluster'
import { Container } from '../../components/layout/Container'
import { Button } from '../../components/ui/Button'
import { IconButton } from '../../components/ui/IconButton'
import { TextLink } from '../../components/ui/TextLink'
import { siteContact, siteNavigation } from '../../data/siteContent'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useHeaderScrollState } from '../../hooks/useHeaderScrollState'
import { useMenuMotion } from '../../hooks/useMenuMotion'
import { refreshManager } from '../../motion/core/refreshManager'
import { useMotionPreferences } from '../../motion/hooks/useMotionPreferences'
import { createMotionMedia } from '../../motion/lib/createMotionMedia'
import { useGsapContext } from '../../motion/hooks/useGsapContext'
import { cx } from '../../lib/utils/cx'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuReady, setIsMenuReady] = useState(false)
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false)
  const preferences = useMotionPreferences()
  const reducedMotion = preferences.reducedMotion
  const isElevated = useHeaderScrollState()
  const panelId = useId()
  const headerRef = useRef<HTMLElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

  const finalizeMenuClose = useCallback(() => {
    setIsMenuReady(false)
    if (shouldRestoreFocus) {
      menuButtonRef.current?.focus()
    }
  }, [shouldRestoreFocus])

  const closeMenu = useCallback((restoreFocus = true) => {
    setShouldRestoreFocus(restoreFocus)

    if (reducedMotion) {
      setIsMenuOpen(false)
      setIsMenuReady(false)
      if (restoreFocus) {
        window.requestAnimationFrame(() => {
          menuButtonRef.current?.focus()
        })
      }
      return
    }

    setIsMenuOpen(false)
  }, [reducedMotion])

  const openMenu = useCallback(() => {
    setIsMenuReady(true)
    setIsMenuOpen(true)
  }, [])

  useBodyScrollLock(isMenuReady)

  useMenuMotion({
    isOpen: isMenuOpen,
    isReady: isMenuReady,
    itemRefs,
    onCloseComplete: finalizeMenuClose,
    overlayRef,
    panelRef,
    reducedMotion,
  })

  useGsapContext(
    () => {
      if (!headerRef.current || reducedMotion) {
        return
      }

      const mm = createMotionMedia()

      mm.add('(min-width: 0px)', () => {
        gsap.to(headerRef.current, {
          backgroundColor: isElevated ? 'rgba(10, 10, 10, 0.92)' : 'rgba(5, 5, 5, 0.38)',
          borderColor: isElevated ? 'rgba(242, 242, 238, 0.16)' : 'rgba(242, 242, 238, 0.08)',
          boxShadow: isElevated ? '0 18px 40px rgba(0, 0, 0, 0.24)' : '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.24,
          ease: 'power2.out',
        })
      })

      return () => {
        mm.revert()
      }
    },
    { dependencies: [isElevated, reducedMotion] },
  )

  useEffect(() => {
    refreshManager.requestRefresh('menu-state')
  }, [isMenuReady])

  useEffect(() => {
    if (!isMenuReady) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [closeMenu, isMenuReady])

  useEffect(() => {
    if (!isMenuReady) {
      itemRefs.current = []
      return
    }

    window.requestAnimationFrame(() => {
      itemRefs.current[0]?.focus()
    })
  }, [isMenuReady])

  useEffect(() => {
    if (!isMenuReady || isMenuOpen || reducedMotion) {
      return
    }

    const timeout = window.setTimeout(() => {
      finalizeMenuClose()
    }, 420)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [finalizeMenuClose, isMenuOpen, isMenuReady, reducedMotion])

  return (
    <header className={cx('site-header', isElevated && 'is-elevated')} data-site-header="" ref={headerRef}>
      <Container className="site-header__inner">
        <a className="site-header__brand" href={homeAnchors.inicio} aria-label="SUBEROS, volver al inicio">
          <img src="/branding/suberos-icon-192.png" width="40" height="40" alt="" aria-hidden="true" />
          <span>SUBEROS</span>
        </a>

        <nav aria-label="Navegacion principal" className="site-header__nav-desktop">
          <ul className="site-header__nav-list">
            {siteNavigation.map((item) => (
              <li key={item.href}>
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <Cluster className="site-header__actions" gap="sm">
          <Button href={homeAnchors.contacto} variant="secondary" size="small">
            Cuentanos tu proyecto
          </Button>
          <IconButton
            aria-controls={panelId}
            aria-expanded={isMenuReady}
            className="site-header__menu-button"
            label={isMenuReady ? 'Cerrar menu principal' : 'Abrir menu principal'}
            onClick={() => (isMenuReady ? closeMenu() : openMenu())}
            ref={menuButtonRef}
          >
            <span className={cx('menu-icon', isMenuReady && 'is-open')}>
              <span />
              <span />
              <span />
            </span>
          </IconButton>
        </Cluster>
      </Container>

      {isMenuReady ? (
        <div className="menu-drawer" aria-hidden={!isMenuOpen && !reducedMotion}>
          <div className="menu-drawer__overlay" onClick={() => closeMenu()} ref={overlayRef} />
          <div className="menu-drawer__panel" id={panelId} ref={panelRef}>
            <Container className="menu-drawer__content" size="content">
              <div className="menu-drawer__header">
                <p className="menu-drawer__eyebrow">Navegacion</p>
                <IconButton
                  className="menu-drawer__close-button"
                  label="Cerrar menu principal"
                  onClick={() => closeMenu()}
                >
                  <span className={cx('menu-icon', 'is-open')}>
                    <span />
                    <span />
                    <span />
                  </span>
                </IconButton>
              </div>
              <nav aria-label="Menu movil">
                <ul className="menu-drawer__list">
                  {siteNavigation.map((item, index) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => closeMenu(false)}
                        ref={(element) => {
                          itemRefs.current[index] = element
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="menu-drawer__contact">
                <p>Contacto directo</p>
                <TextLink href={`mailto:${siteContact.email}`}>{siteContact.email}</TextLink>
                <TextLink href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</TextLink>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  )
}
