import { NFTCard } from '@/page/bridge/component/NFTCard'
import { Button, Form } from '@arco-design/web-react'
import styled from 'styled-components'
import { FC } from 'react'

const NFTs = [
  {
    iconUrl: 'http://iph.href.lu/330x330',
    name: 'The Midas touch',
    amount: 4
  },
  {
    iconUrl: 'http://iph.href.lu/330x330',
    name: 'Brain Mine',
    amount: 2
  },
  {
    iconUrl: 'http://iph.href.lu/330x330',
    name: 'Knife 1',
    amount: 48
  }
]

const NFTCardGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 330px));
  grid-column-gap: 3rem;
  align-items: center;
  justify-content: center;
`

export const SelectNFT: FC<{
  switchStep: () => void
}> = ({ switchStep }) => {
  return (
    <Form.Item field="selectedNFT">
      <NFTCardGroup>
        {
          NFTs.map((NFT, index) => (
            <NFTCard NFTItem={NFT} key={NFT.name} index={index}/>
          ))
        }
      </NFTCardGroup>
      <div className="next-step-button-wrapper">
        <Button type="primary" size="large" onClick={switchStep}>Next</Button>
      </div>
    </Form.Item>
  )
}
