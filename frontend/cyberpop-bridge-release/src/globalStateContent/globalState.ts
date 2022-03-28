import { providers, Contract } from 'ethers'
import type { ContractAddress } from '@/types/contractAddress'

export type GlobalState = {
  provider: providers.Web3Provider;
  badge: Contract;
  bridge: Contract;
  cyt: Contract;
  cyborg: Contract;
  contractAddress: ContractAddress,
  network: 'rinkeby' | 'mumbai';
  selectedAddress: string;
  connectWallet: () => Promise<void>
}
