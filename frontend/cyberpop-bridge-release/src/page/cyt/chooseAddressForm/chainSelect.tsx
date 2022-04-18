import { Select } from '@arco-design/web-react'
import type { SelectProps } from '@arco-design/web-react'
import type { FC } from 'react'

const chains: Record<string, any> = {
  // "ethereum": {
  //   "symbol": "Ethereum Mainnet",
  //   "chainId": 1,
  //   "logo": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
  // },
  // "rinkeby": {
  //   "symbol": "Rinkeby",
  //   "chainId": 4,
  //   "logo": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
  // },
  "mumbai": {
    "symbol": "Mumbai",
    "chainId": 80001,
    "logo": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
  },
  "fuji": {
    "symbol": "Avalanche Fuji Testnet",
    "chainId": 43113,
    "logo": "	https://nftrade.com/img/chains/icons/avax.png"
  },
  // "heco": {
  //   "symbol": "Huobi ECO Chain Mainnet",
  //   "chainId": 128,
  //   "logo": "https://cryptologos.cc/logos/huobi-token-ht-logo.svg?v=022"
  // },
  // "polygon": {
  //   "symbol": "Polygon Mainnet",
  //   "chainId": 137,
  //   "logo": "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022"
  // },
  // "ganache": {
  //   "symbol": "Ganache",
  //   "chainId": 1337,
  //   "logo": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
  // }
}

export const ChainSelect: FC<SelectProps> = (props) => {
  return (
    <Select {...props}>
      {
        Object.keys(chains).map(key => (
          <Select.Option key={chains[key].symbol} value={chains[key].chainId}>
            <div className="d-flex align-center chain-select">
              <img src={chains[key].logo} alt="logo" className="chain-select__prefix-icon" />
              <span>{chains[key].symbol}</span>
            </div>
          </Select.Option>
        ))
      }
    </Select>
  )
}
