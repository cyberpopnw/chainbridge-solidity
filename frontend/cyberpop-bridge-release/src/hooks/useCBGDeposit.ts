import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'
import waitForTransaction from '@/utils/waitForTransaction'

const useCBGDeposit = () => {
  const { contracts } = useGlobalStateContext()
  const CBGResourceId = process.env.REACT_APP_CBGResourceID

  return async (chainId: number, to: string, tokenId: number) => {
    const handler = await contracts?.Bridge?._resourceIDToHandlerAddress(CBGResourceId)

    await waitForTransaction(
      await contracts?.CBG?.approve(handler, tokenId)
    )

    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2)

    return waitForTransaction(
      await contracts?.Bridge?.deposit(chainId, CBGResourceId, data)
    )
  }
}

export default useCBGDeposit
