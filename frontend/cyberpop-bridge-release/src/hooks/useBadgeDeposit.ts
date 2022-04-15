import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'

export const useBadgeDeposit = () => {
  const { badge, bridge } = useGlobalStateContext()

  return async (chainId: number, to: string, tokenId: unknown, amount: number) => {
    const handler = await bridge?.callStatic._resourceIDToHandlerAddress(process.env.BadgeResourceID)
    await badge?.callStatic.setApprovalForAll(handler, true)
    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).substring(2) +
      utils.hexZeroPad(BigNumber.from(amount).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);
    await bridge?.deposit(chainId, process.env.CyborgResourceID, data)
  }
}
