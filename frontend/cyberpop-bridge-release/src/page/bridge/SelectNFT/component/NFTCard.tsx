import { Button, Form, InputNumber, Radio } from '@arco-design/web-react'
import { IconCheck } from '@arco-design/web-react/icon'
import StandardTag from '@/page/bridge/SelectNFT/component/StandardTag'
import Img from '@/component/Image'

import type { FC } from 'react'
import type { FormInstance } from '@arco-design/web-react'
import type { FormValues, NFTItem } from '@/page/bridge/SelectNFT/type'


const NFTCard: FC<{
  NFTItem: NFTItem;
  index: number;
  formInstance: FormInstance;
}> = ({ NFTItem, index, formInstance }) => {
  return (
    <div className="nft-card">
      <Radio value={index} className="nft-card__radio">
        {({ checked }: { checked: boolean }) => (
          <>
            <StandardTag standard={NFTItem.standard} contractAddress={NFTItem.address}/>
            <div className={`nft-card__radio__dot ${checked ? 'nft-card__radio__dot--checked' : ''}`}>
              <IconCheck/>
            </div>
            <div className="nft-card__meta__wrapper">
              <Img
                className="nft-card__meta__image"
                src={NFTItem.image}
                preview={false}
              />
              <p className="nft-card__meta__name">
                {NFTItem.name}
              </p>
              {
                NFTItem.standard !== 'ERC721' && (
                  <p className="nft-card__meta__available">available: {NFTItem.amount}</p>
                )
              }
            </div>
          </>
        )}
      </Radio>
      <Form.Item shouldUpdate>
        {
          (values: FormValues) => {
            const show = values.selectedNFTIndex === index
            return (
              <Form.Item
                field={`amount`}
                hidden={NFTItem.standard !== 'ERC1155'}
                disabled={!show}
                initialValue={1}
              >
                <InputNumber
                  className={`nft-card__input-number ${show ? 'nft-card__input-number--show' : ''}`}
                  mode="button"
                  min={1}
                  max={NFTItem.amount}
                  suffix={(
                    <Button
                      size="mini"
                      onClick={() => formInstance.setFieldValue('amount', NFTItem.amount)}
                    >
                      MAX
                    </Button>
                  )}
                />
              </Form.Item>
            )
          }
        }
      </Form.Item>
    </div>

  )
}

export default NFTCard
