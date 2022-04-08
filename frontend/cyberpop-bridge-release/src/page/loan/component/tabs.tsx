import { IconLaunch } from '@arco-design/web-react/icon'
import { Space } from '@arco-design/web-react'

export const LoanTab = () => (
  <Space direction="horizontal" size="small" className="tabs-item">
    <IconLaunch className="tabs-item-icon" />
    <span className="tabs-item-text">Loan</span>
  </Space>
)

export const BorrowTab = () => (
  <Space direction="horizontal" size="small" className="tabs-item">
    <IconLaunch className="tabs-item-icon" />
    <span className="tabs-item-text">Borrow</span>
  </Space>
)
