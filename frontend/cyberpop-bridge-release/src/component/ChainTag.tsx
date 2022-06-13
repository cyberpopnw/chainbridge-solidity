import { Tag } from '@arco-design/web-react'
import type { FC } from 'react'

type  Props = FC<{
  chainName?: string
}>

const ChainTag: Props = ({ chainName, children }) => {
  const color: Record<string, string> = {
    Mumbai: '#7D4CE0',
    Fuji: '#E74045'
  }

  return (
    <Tag color={chainName && color[chainName]}>
      {
        children || chainName || 'Unknown'
      }
    </Tag>
  )
}

export default ChainTag
