import { NFTCard } from '@/page/bridge/component/NFTCard'
import { Button, Checkbox } from '@arco-design/web-react'
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

const CheckBoxGroup = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 330px));
  grid-column-gap: 3rem;
  align-items: center;
  justify-content: center;
  
  .arco-checkbox {
    margin-right: 0;
  }
`

export const SelectNFT: FC<{
  switchStep: () => void
}> = ({ switchStep }) => {
  return (
    <>
      <CheckBoxGroup>
        {
          NFTs.map(nft => <NFTCard NFTItem={nft} />)
        }
      </CheckBoxGroup>
      <div className="next-step-button-wrapper">
        <Button type="primary" size="large" onClick={switchStep}>Next</Button>
      </div>
    </>
  )
}
