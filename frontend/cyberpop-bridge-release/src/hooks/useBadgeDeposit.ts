import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'
import waitForTransaction from '@/utils/waitForTransaction'

export const useBadgeDeposit = () => {
  const { contracts, selectedAddress } = useGlobalStateContext()

  return async (chainId: number | undefined, to: string, tokenId: unknown, amount: number) => {
    if (chainId == null) {
      return Promise.reject({ message: 'Chain ID is required.' })
    }

    const handler = await contracts?.Bridge?._resourceIDToHandlerAddress(process.env.REACT_APP_BadgeResourceID)

    const isApproved = await contracts?.Bridge?.isApprovedForAll(selectedAddress, handler)
    if (!isApproved) {
      await waitForTransaction(await contracts?.Bridge?.setApprovalForAll(handler, true))
    }

    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).substring(2) +
      utils.hexZeroPad(BigNumber.from(amount).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);

    return waitForTransaction(
      await contracts?.Bridge?.deposit(chainId, process.env.REACT_APP_BadgeResourceID, data)
    )
  }
}
