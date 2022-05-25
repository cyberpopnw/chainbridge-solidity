import { Checkbox, Form, Input, Tag, InputNumber, Tooltip, Typography } from '@arco-design/web-react'
import { IconCheck } from '@arco-design/web-react/icon'
import Img from '@/component/Image'

import type { FC } from 'react'
import type { NFTItem } from '@/page/bridge/selectNFT/type'

const StandardTag: FC<Pick<NFTItem, 'standard'> & { contractAddress?: string }> = ({ standard, contractAddress }) => {
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
      <Tag color={enumValue[standard]} className="nft-standard-tag">{ standard }</Tag>
    </Tooltip>
  )
}


export const NFTCard: FC<{
  NFTItem: NFTItem;
  index: number
}> = ({ NFTItem, index }) => {
  const filed = `nft-select[${index}]`
  return (
    <div className="nft-card__wrapper">
      <Form.Item field={filed + '.meta'} initialValue={{ id: NFTItem.id, standard: NFTItem.standard }} hidden>
        <Input readOnly />
      </Form.Item>
      <Form.Item field={filed + '.selected'} >
        <Checkbox key={NFTItem.name} value={NFTItem.name} className="nft-card__checkbox">
          {({ checked }: { checked: boolean }) => (
            <div className={`${checked ? 'nft-card__checkbox--checked' : ''}`}>
              <StandardTag standard={NFTItem.standard} contractAddress={NFTItem.address} />
              <div className="nft-card__checkbox__dot">
                <IconCheck />
              </div>
              <div className="nft-card__meta__wrapper">
                <Img
                  className="nft-card__meta__image"
                  src={NFTItem.image}
                  preview={false}
                />
                {
                  NFTItem.standard !== 'ERC721' && (
                    <span className="nft-card__meta__amount">x{NFTItem.amount}</span>
                  )
                }
                <p className="nft-card__meta__name">{NFTItem.name}</p>
              </div>
            </div>
          )}
        </Checkbox>
      </Form.Item>
      <Form.Item
        field={filed + '.amount'}
        hidden={NFTItem.standard !== 'ERC1155'}
        disabled={NFTItem.standard !== 'ERC1155'}
      >
        <InputNumber min={1} max={NFTItem.amount} mode="button" placeholder="Amount" style={{ width: '80%' }}/>
      </Form.Item>
    </div>
  )
}
