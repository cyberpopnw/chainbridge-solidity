import { Select } from '@arco-design/web-react'
import styled from 'styled-components'

import chainIds from '@/lib/chainIds'

import type { SelectProps } from '@arco-design/web-react'
import type { FC } from 'react'

const ChainSelectWrapper = styled.div`
  display: flex;
  align-items: center;

  .prefix-icon {
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
  }
`

const ChainSelect: FC<SelectProps> = (props) => {
  return (
    <Select {...props}>
      {
        Object.values(chainIds)
          .filter(chain => chain.enable)
          .map(chain => (
            <Select.Option key={chain.chainName} value={chain.chainId}>
              <ChainSelectWrapper>
                <img src={chain.logo} alt="logo" className="prefix-icon"/>
                <span>{chain.chainName}</span>
              </ChainSelectWrapper>
            </Select.Option>
          ))
      }
    </Select>
  )
}

export default ChainSelect
