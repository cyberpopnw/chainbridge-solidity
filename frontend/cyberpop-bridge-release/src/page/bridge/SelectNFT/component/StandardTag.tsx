import { Tag, Tooltip, Typography } from '@arco-design/web-react'

import type { FC } from 'react'
import type { NFTItem } from '@/page/bridge/SelectNFT/type'

import '@/page/bridge/index.scss'

type Props = {
  contractAddress?: string
} & Pick<NFTItem, 'standard'>

const StandardTag: FC<Props> = ({ standard, contractAddress }) => {
  const enumValue: Record<string, string> = {
    'ERC721': 'purple',
    'ERC1155': 'magenta'
  }

  const content = (
    <>
      <Typography.Text bold style={{ color: "#FFFFFF", marginBottom: 0 }}>Contract Address: </Typography.Text>
      <Typography.Text copyable style={{ color: "#FFFFFF", marginBottom: 0 }}>{contractAddress}</Typography.Text>
    </>
  )

  return (
    <Tooltip position="tl" content={content}>
      <Tag color={enumValue[standard]} className="nft-card__meta__tag">{standard}</Tag>
    </Tooltip>
  )
}

export default StandardTag
