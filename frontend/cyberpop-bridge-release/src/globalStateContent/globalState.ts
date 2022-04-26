import { providers, Contract } from 'ethers'
import type { Network } from '@/contract-address'

export type GlobalState = {
  provider: providers.Web3Provider;
  badge: Contract;
  bridge: Contract;
  cyt: Contract;
  cyborg: Contract;
  contractAddress: Promise<Network | undefined>,
  network?: providers.Network;
  selectedAddress: string | null;
  connectWallet: () => Promise<void>
}
