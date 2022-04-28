import { ContractTransaction } from '@ethersproject/contracts'

const waitForTransaction = async (tx?: ContractTransaction) => {
  await tx?.wait?.()
  return tx
}

export default waitForTransaction
