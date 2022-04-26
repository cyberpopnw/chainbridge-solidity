import { Message, Notification } from '@arco-design/web-react'
import { createContext, useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ethers } from "ethers"

import BridgeArtifact from "@/contracts/Bridge.json";
import ERC20Artifact from "@/contracts/ERC20.json";
import ERC721Artifact from "@/contracts/Cyborg.json";
import ERC1155Artifact from "@/contracts/Badge.json";

import type { FC } from 'react'
import type { GlobalState } from './globalState'
import type { Network } from '@/contract-address'

export const GlobalStateContext = createContext<Partial<GlobalState> | undefined>(undefined);
GlobalStateContext.displayName = 'GlobalStateContext';

const GlobalStateProvider: FC = ({ children }) => {
  const [provider, setProvider] = useState<GlobalState['provider']>(new ethers.providers.Web3Provider(window.ethereum as any))
  const [selectedAddress, setSelectedAddress] = useState<GlobalState['selectedAddress']>()
  const [contractAddress, setContractAddress] = useState<GlobalState['contractAddress']>()
  const [network, setNetwork] = useState<GlobalState['network']>()
  const [bridge, setBridge] = useState<GlobalState['bridge']>()
  const [cyt, setCYT] = useState<GlobalState['cyt']>()
  const [cyborg, setCyborg] = useState<GlobalState['cyborg']>()
  const [badge, setBadge] = useState<GlobalState['badge']>()

  const navigate = useNavigate()
  const location = useLocation()

  const initializeContract = useCallback((contract: Network) => {
    if (!contract) return

    setBridge(() => new ethers.Contract(
      contract.bridge,
      BridgeArtifact.abi,
      provider.getSigner(0)
    ))

    setCYT(() => new ethers.Contract(
      contract.cyt,
      ERC20Artifact.abi,
      provider.getSigner(0)
    ))

    setCyborg(() => new ethers.Contract(
      contract.cyborg,
      ERC721Artifact.abi,
      provider.getSigner(0)
    ))

    setBadge(() => new ethers.Contract(
      contract.badge,
      ERC1155Artifact.abi,
      provider.getSigner(0)
    ))

  }, [provider])

  const connectWallet = async () => await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' }).then(async res => {
    setSelectedAddress(res?.[0])
    setNetwork(await provider.getNetwork())
  })

  const setEventListener = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (Array.isArray(accounts) && accounts.length) {
        Notification.info({
          title: 'Account Changed',
          content: `New account: ${accounts[0]}`
        })
        setSelectedAddress(accounts[0])
      } else {
        Notification.info({
          title: 'No wallet address available',
          content: `Please log in again.`
        })
        setSelectedAddress(undefined)
      }
    })

    window.ethereum.on('chainChanged', () => {
      Notification.info({
        title: "The selected chain has changed.",
        content: "The page will refresh in 3 seconds"
      })
      setTimeout(() => window.location.reload(), 3000)
    })
  }


  useEffect(() => {
    if (window.ethereum === undefined) {
      navigate('/no-wallet-detected')
      return
    }

    if (!selectedAddress) {
      if (location.pathname !== '/connect-wallet') {
        navigate(`/connect-wallet?redirect=${location.pathname}`)
      }
    } else {
      setEventListener()

      // load network contract
      setContractAddress(() => import('@/contract-address')
        .then(module => {
          let contract = module.fuji
          switch (network?.chainId) {
            case 80001:
              contract = module.mumbai;
              break;
          }
          initializeContract(contract)
          return contract
        })
        .catch(() => {
          Message.error('Contract address load error');
          return undefined
        })
      )
    }

    return () => { window.ethereum.removeAllListeners() }
  }, [location.pathname, navigate, selectedAddress, initializeContract, provider, network?.chainId])

  const providerValue: Partial<GlobalState> = {
    badge,
    bridge,
    cyt,
    cyborg,
    network,
    contractAddress,
    selectedAddress,
    connectWallet
  }

  return (
    <GlobalStateContext.Provider value={providerValue}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider

