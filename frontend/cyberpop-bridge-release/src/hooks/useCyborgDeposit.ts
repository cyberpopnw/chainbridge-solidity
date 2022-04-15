import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'

export const useCyborgDeposit = () => {
  const { cyborg, bridge } = useGlobalStateContext()

  return async (chainId: number, to: string, tokenId: unknown) => {
    const handler = await bridge?.callStatic._resourceIDToHandlerAddress(process.env.CyborgResourceID)
    await cyborg?.callStatic.approve(handler, tokenId)
    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);
    await bridge?.deposit(chainId, process.env.CyborgResourceID, data)
  }
}
