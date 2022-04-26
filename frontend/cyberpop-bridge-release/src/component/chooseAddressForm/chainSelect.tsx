import { Select } from '@arco-design/web-react'

import chainIds from '@/lib/chainIds'

import type { SelectProps } from '@arco-design/web-react'
import type { FC } from 'react'

const ChainSelect: FC<SelectProps> = (props) => {
  return (
    <Select {...props}>
      <Select.Option value="unknown" key="unknown">
        Unknown Chain
      </Select.Option>
      {
        Object.keys(chainIds).map(key => (
          <Select.Option key={chainIds[key].chainName} value={chainIds[key].chainId}>
            <div className="d-flex align-center chain-select">
              <img src={chainIds[key].logo} alt="logo" className="chain-select__prefix-icon" />
              <span>{chainIds[key].chainName}</span>
            </div>
          </Select.Option>
        ))
      }
    </Select>
  )
}

export default ChainSelect
