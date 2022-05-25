import { Button, Form, Input, Spin } from '@arco-design/web-react'
import ChainSelect from '@/component/chooseAddressForm/chainSelect'
import { NFTCard } from '@/page/bridge/selectNFT/component/NFTCard'

import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useRequest } from 'ahooks'

import { getChain } from '@/lib/chainIds'
import { getTokenURIs } from '@/page/bridge/selectNFT/request'

import '@/component/chooseAddressForm/index.scss'
import '@/page/bridge/index.scss'
import '@/scss/flex.scss'

import type { FC } from 'react'
import type { StepItemProps, NFTItem } from '@/page/bridge/selectNFT/type'

// TODO: nft list lazy load and virtual list
// ERC1155 contract run balanceOfBatch([playerAddress], [0]) is work,balanceOfBatch([playerAddress], [0, 1]) not work.
// ERC1155 contract run uri(0) return 'https://api.cyberpop.online/badge/', no include id ?
export const SelectNFT: FC<StepItemProps> = ({ switchStep }) => {
  const { cyborg, badge, selectedAddress, network } = useGlobalStateContext()

  const { data, loading } = useRequest<NFTItem[], any>(
    async () => getTokenURIs([cyborg, badge], selectedAddress || '')
  )

  return (
    <>
      <div className="choose-address-form">
        <Form.Item label="From" field="sourceChain"
                   rules={[{ required: true, message: 'Source chain is required' }]}
                   initialValue={getChain(network?.chainId)?.chainId || 'unknown'}
        >
          <ChainSelect placeholder="Select Source Chain"/>
        </Form.Item>
        <Form.Item label="Source Address" field="sourceAddress" initialValue={selectedAddress}>
          {
            selectedAddress
              ? <Input readOnly/>
              : <Button type="primary" className="form-full-button">Connect Wallet</Button>
          }
        </Form.Item>
      </div>
      <Spin loading={loading} size={40}>
        <div className="nft-select__wrapper">
          {
            data?.length
              ? data.map((NFT, index) => (
                <NFTCard NFTItem={NFT} key={`${NFT.standard} ${NFT.name}`} index={index}/>
              ))
              : <h3 className="no-nft-available">No NFT available</h3>
          }
        </div>
      </Spin>
      <div className="flex-center">
        <Button type="primary" onClick={switchStep} className="next-step-button">NEXT</Button>
      </div>
    </>
  )
}
