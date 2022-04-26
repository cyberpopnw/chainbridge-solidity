import { utils } from 'ethers'
import { getChain } from '@/lib/chainIds'
import type { Chain } from '@/lib/chainIds'
import { Message } from '@arco-design/web-react'

// Docs: https://metamask.github.io/api-playground/api-documentation

export const addChain = (chainId: Chain['chainId']) => {
  const chain = getChain(chainId)
  if (!chain) {
    return Promise.reject({
      message: 'The chain is not support.'
    })
  }
  return window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: utils.hexValue(chain.chainId),
        chainName: chain.chainName,
        nativeCurrency: chain.nativeCurrency,
        rpcUrls: chain.rpcUrls,
        blockExplorerUrls: chain.blockExplorerUrls,
      },
    ],
  });
}

export const switchChain = (chainId: Chain['chainId']) => window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [
    {
      chainId: utils.hexValue(chainId)
    },
  ],
}).catch(e => {
  // wallet not add selected network, call addChain function.
  if (e.code === 4902) {
    Message.warning('Please add network first.')
    return addChain(chainId)
  }
  return Promise.reject(e)
})
