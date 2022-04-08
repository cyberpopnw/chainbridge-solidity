import styled from 'styled-components'
import { Form, Checkbox, Image, Radio, Input } from '@arco-design/web-react'

import type { FC } from 'react'

export type NFTItem = {
  iconUrl: string;
  amount: number;
  name: string;
}

const NFTCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #190127;
  text-align: center;
  padding-bottom: 3rem;
  position: relative;

  .nft-card-checkbox {
    position: absolute;
    right: 0;
    top: 0;

    .arco-icon-hover {
      ::before {
        content: none;
      }
    }

    .arco-checkbox-mask {
      width: 3rem;
      height: 3rem;
      background-color: #BBBBBB;
      opacity: 0.4;
      border-radius: 0 10px;
    }
  }

  .nft-card-checked {
    position: absolute;
    right: 0;
    top: 0;

    .arco-checkbox-mask {
      width: 3rem;
      height: 3rem;
      background-color: #1976D2 !important;
      opacity: 1;
      border-radius: 0 10px;
    }

    .arco-checkbox-mask-icon {
      width: 2rem;
    }
  }
`

const NFTMeta = styled.div`
  padding: 3rem 1.5rem 0;

  .arco-image {
    width: 100%;
    text-align: center;
    cursor: default;

    &-img {
      width: 100%;
    }
  }

  .nft-amount {
    position: absolute;
    font-size: 4rem;
    color: #7D1DFF;
    right: 2rem;
    bottom: 1rem;
  }

  .nft-name {
    font-size: 2rem;
    color: #FFFFFF;
    margin: 2rem 0;
  }
`


export const NFTCard: FC<{
  NFTItem: NFTItem;
  index: number;
}> = ({ NFTItem, index }) => {
  const field = `NFTItem[${index}]`

  return (
    <NFTCardContainer>
      <Form.Item field={`${field}.selected`}>
        <Checkbox key={NFTItem.name}>
          {
            ({ checked }: { checked: boolean }) => (
              <>
                <Checkbox key={NFTItem.name} value={NFTItem.name} checked={checked}
                          className={checked ? 'nft-card-checked' : 'nft-card-checkbox'}/>
                <NFTMeta>
                  <div style={{ position: 'relative' }}>
                    <Image src={NFTItem.iconUrl} preview={false}/>
                    <span className="nft-amount">x{NFTItem.amount}</span>
                  </div>
                  <p className="nft-name">{NFTItem.name}</p>
                </NFTMeta>
              </>
            )
          }
        </Checkbox>
      </Form.Item>
      <Form.Item field={`${field}.name`} initialValue={NFTItem.name} hidden>
        <Input readOnly/>
      </Form.Item>
      <Form.Item field={`${field}.action`} initialValue="transfer">
        <Radio.Group name="method" type="button" style={{ zIndex: 1001 }}>
          <Radio value="transfer">TRANSFER</Radio>
          <Radio value="sell">SELL</Radio>
        </Radio.Group>
      </Form.Item>
    </NFTCardContainer>
  )
}
