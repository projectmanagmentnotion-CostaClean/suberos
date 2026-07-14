import type { RefObject } from 'react'

type FocusableField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement

export function focusFirstFieldError<TField extends string>(
  order: readonly TField[],
  refs: Partial<Record<TField, RefObject<FocusableField | null>>>,
  errors: Partial<Record<TField, string>>,
) {
  const firstField = order.find((field) => Boolean(errors[field]))

  if (!firstField) {
    return
  }

  refs[firstField]?.current?.focus()
}
