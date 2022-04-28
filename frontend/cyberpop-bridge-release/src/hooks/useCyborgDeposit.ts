import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'
import waitForTransaction from '@/utils/waitForTransaction'

export const useCyborgDeposit = () => {
  const { cyborg, bridge } = useGlobalStateContext()

  return async (chainId: number | undefined, to: string, tokenId: unknown) => {
    if (chainId == null) {
      return Promise.reject({ message: 'Chain ID is required.' })
    }

    const handler = await bridge?._resourceIDToHandlerAddress(process.env.REACT_APP_CyborgResourceID)
    await waitForTransaction(cyborg?.approve(handler, tokenId))

    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);

    return waitForTransaction(
      await bridge?.deposit(chainId, process.env.REACT_APP_CyborgResourceID, data)
    )
  }
}
