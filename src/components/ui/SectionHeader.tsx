import { ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'
import { Cluster } from '../layout/Cluster'
import { Stack } from '../layout/Stack'
import { Eyebrow } from './Eyebrow'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  body?: string
  align?: 'start' | 'center'
  action?: ReactNode
  width?: 'compact' | 'default' | 'wide'
}

export function SectionHeader({
  action,
  align = 'start',
  body,
  eyebrow,
  title,
  width = 'default',
}: SectionHeaderProps) {
  return (
    <Stack className={cx('section-header', `section-header--${align}`, `section-header--${width}`)} gap="sm">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Cluster align="end" className="section-header__row" gap="md" justify="between">
        <h2>{title}</h2>
        {action ? <div className="section-header__action">{action}</div> : null}
      </Cluster>
      {body ? <p className="section-header__body">{body}</p> : null}
    </Stack>
  )
}
