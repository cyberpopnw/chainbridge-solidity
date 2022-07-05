import { Tag } from '@arco-design/web-react'
import chainIds from '@/lib/chainIds'
import type { TagProps } from '@arco-design/web-react'
import type { FC } from 'react'

type  Props = FC<{
  chain?: string;
} & TagProps>

const ChainTag: Props = ({ chain , color, children, ...props }) => {
  return (
    <Tag color={color || (chain ? chainIds[chain]?.color : undefined)} {...props}>
      { children || ( chain ? chainIds[chain].chainName : 'Unknown' ) }
    </Tag>
  )
}

export default ChainTag
