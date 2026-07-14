import { AssetApprovalStatus, PublicationStatus } from '../../data/portfolioProjects'
import { cx } from '../../lib/utils/cx'

type ApprovalBadgeTone = PublicationStatus | AssetApprovalStatus | 'ok' | 'warning'

type ApprovalBadgeProps = {
  children: string
  tone: ApprovalBadgeTone
}

export function ApprovalBadge({ children, tone }: ApprovalBadgeProps) {
  return <span className={cx('approval-badge', `approval-badge--${tone}`)}>{children}</span>
}
