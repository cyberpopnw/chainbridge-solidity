import { createContext, useState, useCallback, useEffect } from 'react'

import { ethers } from "ethers"

import mumbai from "@/contract-address/mumbai.json"
import rinkeby from "@/contract-address/rinkeby.json"

import type { FC } from 'react'
import type { GlobalState } from './globalState'
import { useNavigate, useLocation } from 'react-router-dom'

export const GlobalStateContext = createContext<Partial<GlobalState> | undefined>(undefined);
GlobalStateContext.displayName = 'GlobalStateContext';

const getChainID = () => {
  if (window.ethereum === undefined || window.ethereum.chainId === null) return
  return parseInt(window.ethereum.chainId)
}

const GlobalStateProvider: FC = ({ children }) => {
  const [provider, setProvider] = useState<GlobalState['provider']>()

  const [selectedAddress, setAddress] = useState<GlobalState['selectedAddress']>()
  const [contractAddress, setContractAddress] = useState<GlobalState['contractAddress']>()
  const [assetsAddress, setAssetsAddress] = useState<GlobalState['contractAddress']>()
  const [network, setNetwork] = useState<GlobalState['network']>()

  // const [txBeingSent, setTx] = useState('')
  // const [transactionError, setTxError] = useState(null)

  const [bridge, setBridge] = useState<GlobalState['bridge']>()
  const [cyt, setCYT] = useState<GlobalState['cyt']>()
  const [cyborg, setCyborg] = useState<GlobalState['cyborg']>()
  const [badge, setBadge] = useState<GlobalState['badge']>()

  const navigate = useNavigate()
  const location = useLocation()

  const update = useCallback(() => {
    if (!network || !provider) return

    // setBridge(() => new ethers.Contract(
    //   contractAddress.bridge,
    //   BridgeArtifact.abi,
    //   provider.getSigner(0)
    // ))

    // setCYT(() => new ethers.Contract(
    //   assetsAddress.cyt,
    //   ERC20Artifact.abi,
    //   provider.getSigner(0)
    // ))

    // setCyborg(() => new ethers.Contract(
    //   assetsAddress.cyborg,
    //   ERC721Artifact.abi,
    //   provider.getSigner(0)
    // ))

    // setBadge(() => new ethers.Contract(
    //   assetsAddress.badge,
    //   ERC1155Artifact.abi,
    //   provider.getSigner(0)
    // ))

  }, [network, provider])

  const connectWallet = useCallback(async () => await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' }).then(res => {
    if (res) {
      const [_selectedAddress] = res
      setAddress(_selectedAddress)

      const chainID = getChainID()
      const networkName = chainID === 4 ? 'rinkeby' : 'mumbai'

      setContractAddress(chainID === 4 ? rinkeby : mumbai)
      setAssetsAddress(chainID === 4 ? rinkeby : mumbai)
      setNetwork(networkName)
    }
  }), [])

  useEffect(() => {
    if (window.ethereum === undefined) {
      navigate('/no-wallet-detected')
      return
    }

    if (!provider) {
      setProvider(() => new ethers.providers.Web3Provider(window.ethereum as any))
    }

    connectWallet()
      .then(update)
      .catch(err => {
        console.log(err)
        if (location.pathname !== '/connect-Wallet') {
          navigate(`/connect-Wallet?redirect=${location.pathname}`)
        }
      })
  }, [connectWallet, location.pathname, navigate, network, provider, selectedAddress, update])

  const providerValue: Partial<GlobalState> = {
    provider,
    badge,
    bridge,
    cyt,
    cyborg,
    contractAddress,
    network,
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

