import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'
import waitForTransaction from '@/utils/waitForTransaction'

export const useCyborgDeposit = () => {
  const { contracts } = useGlobalStateContext()

  return async (chainId: number | undefined, to: string, tokenId: unknown) => {
    if (chainId == null) {
      return Promise.reject({ message: 'Chain ID is required.' })
    }

    const handler = await contracts?.Bridge?._resourceIDToHandlerAddress(process.env.REACT_APP_CyborgResourceID)

    await waitForTransaction(await contracts?.Cyborg?.approve(handler, tokenId))

    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);

    return waitForTransaction(
      await contracts?.Bridge?.deposit(chainId, process.env.REACT_APP_CyborgResourceID, data)
    )
  }
}
