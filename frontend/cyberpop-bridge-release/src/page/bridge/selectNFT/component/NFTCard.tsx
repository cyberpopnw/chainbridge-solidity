import { Checkbox, Form, Image, Input, Radio, Tag } from '@arco-design/web-react'
import { IconCheck } from '@arco-design/web-react/icon'
import { InputNumber } from '@/page/bridge/selectNFT/component/InputNumber'

import type { FC } from 'react'
import type { NFTItem } from '@/page/bridge/selectNFT/type'

const StandardTag: FC<Pick<NFTItem, 'standard'>> = ({ standard }) => {
  const enumValue: Record<string, string> = {
    'ERC721': 'purple',
    'ERC1155': 'magenta'
  }
  return <Tag className="nft-standard-tag" color={enumValue[standard] || ''}>{ standard }</Tag>
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
      <Form.Item field={filed + '.selected'}>
        <Checkbox key={NFTItem.name} value={NFTItem.name}>
          {({ checked }: { checked: boolean }) => (
            <div className={`nft-card__checkbox ${checked ? 'nft-card__checkbox--checked' : ''}`}>
              <StandardTag standard={NFTItem.standard} />
              <div className="nft-card__checkbox__dot">
                <IconCheck />
              </div>
              <div className="nft-card__meta__wrapper">
                <Image
                  className="nft-card__meta__image"
                  src={NFTItem.image}
                  preview={false}
                />
                <span className="nft-card__meta__amount">x{NFTItem.amount}</span>
                <p className="nft-card__meta__name">{NFTItem.name}</p>
              </div>
            </div>
          )}
        </Checkbox>
      </Form.Item>
      <Form.Item field={filed + '.amount'} hidden={NFTItem.standard !== 'ERC1155'} disabled={NFTItem.standard !== 'ERC1155'}>
        <InputNumber />
      </Form.Item>
      <Form.Item field={filed + '.action'} initialValue="transfer">
        <Radio.Group className="action-button__group" name={NFTItem.name} type="button">
          {
            ['transfer', 'sell'].map(item => (
              <Radio value={item} key={item}>
                {
                  ({ checked }: { checked: boolean }) => (
                    <button
                      className={`action-button__item ${ checked ? 'action-button__item--checked' : '' }`}
                    >{ item.toUpperCase() }</button>
                  )
                }
              </Radio>
            ))
          }
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
