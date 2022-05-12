import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'
import waitForTransaction from '@/utils/waitForTransaction'
import { getChain } from '@/lib/chainIds'

export const useCytDeposit = () => {
  const { cyt, bridge } = useGlobalStateContext()

  return async (chainId: number | undefined, to: string, amount: number) => {
    const targetChain = getChain(chainId)

    if (!targetChain) {
      return Promise.reject({ message: `Unknown Chain ID ${chainId}` })
    }

    const handler = await bridge?._resourceIDToHandlerAddress(process.env.REACT_APP_CytResourceID)
    await waitForTransaction(await cyt?.increaseAllowance(handler, amount))

    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(amount).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);

    return waitForTransaction(
      await bridge?.deposit(targetChain.bridgeId, process.env.REACT_APP_CytResourceID, data)
    )
  }
}
