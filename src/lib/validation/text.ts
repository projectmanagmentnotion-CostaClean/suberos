export function normalizeSingleLine(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

export function normalizeMultiline(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function normalizeUrl(value: string) {
  const trimmed = normalizeSingleLine(value)

  if (!trimmed) {
    return ''
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}

export function countLettersAndDigits(value: string) {
  const matches = value.match(/[\p{L}\p{N}]/gu)
  return matches?.length ?? 0
}

export function containsRepeatedSpamPattern(value: string) {
  const normalized = value.toLowerCase()
  return /(.)\1{7,}/.test(normalized) || /(https?:\/\/\S+\s*){3,}/.test(normalized)
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value)
}

export function isValidPhone(value: string) {
  return /^\+?[\d\s().-]{7,20}$/u.test(value)
}

export function isValidHttpUrl(value: string) {
  return /^https?:\/\/[^\s/$.?#].[^\s]*$/iu.test(value)
}
