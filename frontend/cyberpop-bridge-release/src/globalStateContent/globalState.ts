import { providers, Contract } from 'ethers'
import type { Network } from '@/contract-address'

// type contract = 'CYT' | 'Cyborg' | 'Badge' | 'CBG' | 'Bridge'

export type GlobalState = {
  provider: providers.Web3Provider;
  contracts: Partial<{
    Bridge: Contract;
    Badge: Contract;
    CYT: Contract;
    Cyborg: Contract;
  }>;
  contractAddress: Promise<Network | undefined>;
  network?: providers.Network;
  selectedAddress: string | null;
  connectWallet: () => Promise<void>
}
