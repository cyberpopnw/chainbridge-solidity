import styled from 'styled-components'
import { Button, Checkbox, Image, Radio } from '@arco-design/web-react'
import { FlexCenter } from '@/layout/flex'

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

const NFTName = styled.h3`
  font-size: 2rem;
  color: #ffffff;
`

const NFTMeta = styled.div`
  padding: 3rem 1rem;
  position: relative;
  
  .arco-image {
    width: 100%;
    text-align: center;
    
    &-img {
      width: 100%;
    }
  }

  .nft-amount {
    position: absolute;
    font-size: 4rem;
    color: #7D1DFF;
    right: 2rem;
    bottom: 4rem;
  }
`

export const NFTCard: FC<{
  NFTItem: NFTItem;
}> = ({ NFTItem }) => {
  return (
    <NFTCardContainer>
      <Checkbox value={NFTItem.name} key={NFTItem.name} >
        {
          ({ checked }: { checked: boolean }) => (
            <>
              <Checkbox checked={checked}  className={checked ? 'nft-card-checked' : 'nft-card-checkbox'} />
              <NFTMeta>
                <Image src={NFTItem.iconUrl}/>
                <span className="nft-amount">x{NFTItem.amount}</span>
              </NFTMeta>
              <NFTName>{NFTItem.name}</NFTName>
            </>
          )
        }
      </Checkbox>
      <FlexCenter>
        <Radio.Group name="method" type="button" style={{ zIndex: 1001 }}>
          <Radio value="transfer" defaultChecked>TRANSFER</Radio>
          <Radio value="sell">SELL</Radio>
        </Radio.Group>
      </FlexCenter>
    </NFTCardContainer>
  )
}
