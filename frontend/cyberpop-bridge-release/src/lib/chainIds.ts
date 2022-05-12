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
    logo: "	https://nftrade.com/img/chains/icons/avax.png",
  }
}

export const getChain = (chainId?: Chain['chainId']) => {
  if (!chainId) return
  let result
  for (let chain in chainIds) {
    if (chainId === chainIds[chain].chainId) {
      result = chainIds[chain]
      break
    }
  }
  return result
}


export default chainIds
