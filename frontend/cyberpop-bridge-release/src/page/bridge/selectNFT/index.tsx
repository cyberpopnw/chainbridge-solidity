import { Button, Form, Spin } from '@arco-design/web-react'
import { NFTCard } from '@/page/bridge/selectNFT/component/NFTCard'

import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useRequest } from 'ahooks'

import { getTokenURIs } from '@/page/bridge/selectNFT/request'

import type { FC } from 'react'
import type { StepItemProps, NFTItem } from '@/page/bridge/selectNFT/type'

// TODO: nft list lazy load and virtual list
// ERC1155 contract run balanceOfBatch([playerAddress], [0]) is work,balanceOfBatch([playerAddress], [0, 1]) not work.
// ERC1155 contract run uri(0) return 'https://api.cyberpop.online/badge/', no include id ?
export const SelectNFT: FC<StepItemProps> = (props) => {
  const { cyborg, badge, selectedAddress } = useGlobalStateContext()
  const cyborgTokenIds = async () => await cyborg?.callStatic.tokensOfOwner(selectedAddress) as NFTItem['id'][]
  const badgeTokenIds = async () => await badge?.callStatic.tokensOfOwner(selectedAddress) as NFTItem['id'][]

  const { data, loading } = useRequest<NFTItem[], any>(
    async () => getTokenURIs(
      [cyborg, badge], selectedAddress || '')
    ([await cyborgTokenIds(), await badgeTokenIds()]
    )
  )

  return (
    <Spin size={40} loading={loading}>
      <>
        <div className="nft-select__wrapper">
          {
           data?.map((NFT, index) => (
                <NFTCard NFTItem={NFT} key={NFT.name} index={index}/>
              ))
          }
        </div>
        <Form.Item className="step__item__next-step__wrapper">
          <Button type="primary" size="large" className="step__item__next-step__button" onClick={props.switchStep}>Next</Button>
        </Form.Item>
      </>
    </Spin>
  )
}
