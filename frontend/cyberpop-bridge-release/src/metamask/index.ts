import { utils } from 'ethers'

export const switchChain = async (chainId: number) => window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [
    {
      chainId: utils.hexValue(chainId)
    },
  ],
})
