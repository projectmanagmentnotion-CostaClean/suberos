import { ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'
import { Cluster } from '../layout/Cluster'
import { Stack } from '../layout/Stack'
import { Eyebrow } from './Eyebrow'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  titleId?: string
  titleAs?: 'h1' | 'h2'
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
  titleId,
  titleAs: TitleTag = 'h2',
  width = 'default',
}: SectionHeaderProps) {
  return (
    <Stack className={cx('section-header', `section-header--${align}`, `section-header--${width}`)} gap="sm">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Cluster align="end" className="section-header__row" gap="md" justify="between">
        <TitleTag id={titleId}>{title}</TitleTag>
        {action ? <div className="section-header__action">{action}</div> : null}
      </Cluster>
      {body ? <p className="section-header__body">{body}</p> : null}
    </Stack>
  )
}
