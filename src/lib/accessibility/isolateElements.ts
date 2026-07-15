type IsolatedElementSnapshot = {
  element: HTMLElement
  inert: boolean
}

export function isolateElements(elements: Array<HTMLElement | null | undefined>) {
  const snapshots: IsolatedElementSnapshot[] = []

  for (const element of elements) {
    if (!element) {
      continue
    }

    snapshots.push({
      element,
      inert: 'inert' in element ? element.inert : false,
    })

    if ('inert' in element) {
      element.inert = true
    }
  }

  return () => {
    for (const snapshot of snapshots) {
      if ('inert' in snapshot.element) {
        snapshot.element.inert = snapshot.inert
      }
    }
  }
}
