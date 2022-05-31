import { Tag, Tooltip, Typography, Space } from '@arco-design/web-react'
import styled from 'styled-components'

import type { FC } from 'react'
import type { NFTItem } from '@/page/bridge/SelectNFT/type'

import '@/page/bridge/index.scss'

type Props = {
  contractAddress?: string;
  id?: number;
} & Pick<NFTItem, 'standard'>

const TypographyText = styled(Typography.Text)`
  color: #FFFFFF;
  margin-bottom: 0;
`

const StandardTag: FC<Props> = ({ standard, contractAddress, id }) => {
  const enumValue: Record<string, string> = {
    'ERC721': 'purple',
    'ERC1155': 'magenta'
  }

  const content = (
    <div>
      <div>
        <TypographyText bold>Contract Address: </TypographyText>
        <TypographyText copyable>{contractAddress}</TypographyText>
      </div>
      <Space size="mini" />
      <TypographyText >ID: {id}</TypographyText>
    </div>
  )

  return (
    <Tooltip position="tl" content={content}>
      <Tag color={enumValue[standard]} className="nft-card__meta__tag">{standard}</Tag>
    </Tooltip>
  )
}

export default StandardTag
