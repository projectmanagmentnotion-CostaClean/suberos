const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function isFocusable(element: HTMLElement) {
  if (element.hidden) {
    return false
  }

  if (element.getAttribute('aria-hidden') === 'true') {
    return false
  }

  if ('inert' in element && element.inert) {
    return false
  }

  return !element.hasAttribute('disabled')
}

export function getFocusableElements(container: ParentNode) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isFocusable)
}
