import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { utils, BigNumber } from 'ethers'

export const useCytDeposit = () => {
  const { cyt, bridge } = useGlobalStateContext()

  return async (chainId: number, to: string, amount: number) => {
    const handler = await bridge?.callStatic._resourceIDToHandlerAddress(process.env.REACT_APP_CytResourceID)
    await cyt?.callStatic.increaseAllowance(handler, amount)
    const data = '0x' +
      utils.hexZeroPad(BigNumber.from(amount).toHexString(), 32).substring(2) +
      utils.hexZeroPad(utils.hexlify((to.length - 2) / 2), 32).substring(2) +
      to.substring(2);
    return bridge?.deposit(chainId, process.env.REACT_APP_CytResourceID, data)
  }
}
