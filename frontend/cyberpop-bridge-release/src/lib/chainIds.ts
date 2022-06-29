export type Chain = {
  chainName: string;
  chainId: number;
  bridgeId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[]
  logo: string;
}

const chainIds: Record<string, Chain> = {
  "mumbai": {
    chainName: "Mumbai",
    chainId: 80001,
    bridgeId: 0,
    nativeCurrency: {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com', 'https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  },
  "fuji": {
    chainName: "Avalanche Fuji Testnet",
    chainId: 43113,
    bridgeId: 1,
    nativeCurrency: {
      "name": "AVAX",
      "symbol": "AVAX",
      "decimals": 18
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
    logo: "https://nftrade.com/img/chains/icons/avax.png",
  },
  // "bsc": {
  //   chainName: 'Binance Smart Chain',
  //   chainId: 56,
  //   bridgeId: 2,
  //   nativeCurrency: {
  //     name: 'BNB',
  //     symbol: 'BNB',
  //     decimals: 18
  //   },
  //   rpcUrls: ['https://bsc-dataseed1.defibit.io'],
  //   blockExplorerUrls: ['https://bscscan.com/'],
  //   logo: 'https://d2cimmz3cflrbm.cloudfront.net/nwhome/BSC.ico'
  // },
  "bscTestNet": {
    chainName: 'Binance Smart Chain TestNet',
    chainId: 97,
    bridgeId: 2,
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18
    },
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545'
    ],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    logo: 'https://d2cimmz3cflrbm.cloudfront.net/nwhome/BSC.ico'
  }
}

export const getChain = (value?: unknown, key?: keyof Chain) => {
  if (value == null) return
  let result
  for (let chain in chainIds) {
    if (value === chainIds[chain][key || 'chainId']) {
      result = chainIds[chain]
      break
    }
  }
  return result
}


export default chainIds
