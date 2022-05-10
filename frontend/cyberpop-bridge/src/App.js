import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import BridgeArtifact from "./contracts/Bridge.json";
import ERC20Artifact from "./contracts/ERC20.json";
import ERC721Artifact from "./contracts/ERC721.json";
import ERC1155Artifact from "./contracts/ERC1155.json";

import { ethers } from "ethers"
import { Link, Route } from "wouter"
import { NoWalletDetected } from "./components/NoWalletDetected"
import { ConnectWallet } from "./components/ConnectWallet"
import { WaitingForTransactionMessage } from "./components/WaitingForTransactionMessage"
import { TransactionErrorMessage } from "./components/TransactionErrorMessage"
import { TransferCYT } from "./components/TransferCYT"
import { TransferCyborg } from "./components/TransferCyborg"
import { TransferBadge } from "./components/TransferBadge"
import { RegisterResource } from "./components/RegisterResource"
import { QueryResource } from "./components/QueryResource"
import { Admin } from "./components/Admin"
import { Collections } from "./components/Collections"
import { Status } from "./components/Status"
import { Staking } from "./components/Staking"
import { AppContext } from "./hooks/AppContext";

import mumbai from "./contract-address/mumbai.json"
import rinkeby from "./contract-address/rinkeby.json"
import development from "./contract-address/development-fork.json"
import geth from "./contract-address/geth.json"
// import assets from "./contract-address.json"

function App() {
  const [selectedAddress, setAddress] = useState(null)
  const [network, setNetwork] = useState('')
  const [networkError, setNetworkError] = useState(null)
  const [txBeingSent, setTx] = useState('')
  const [transactionError, setTxError] = useState(null)
  const [contractAddress, setContractAddress] = useState({})
  const [assetsAddress, setAssetsAddress] = useState({})
  const [bridge, setBridge] = useState(null)
  const [cyt, setCYT] = useState(null)
  const [cyborg, setCyborg] = useState(null)
  const [badge, setBadge] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    const update = () => {
      if (!network) return

      let _provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(_provider)

      let b = new ethers.Contract(
        contractAddress.bridge,
        BridgeArtifact.abi,
        _provider.getSigner(0)
      )
      setBridge(b)

      b = new ethers.Contract(
        assetsAddress.cyt,
        ERC20Artifact.abi,
        _provider.getSigner(0)
      )
      setCYT(b)

      b = new ethers.Contract(
        assetsAddress.cyborg,
        ERC721Artifact.abi,
        _provider.getSigner(0)
      )
      setCyborg(b)
      b = new ethers.Contract(
        assetsAddress.badge,
        ERC1155Artifact.abi,
        _provider.getSigner(0)
      )
      setBadge(b)
    }
    update()
  }, [network, selectedAddress])

  const _connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(selectedAddress)
    _checkNetwork()
  }

  const _dismissNetworkError = async () => {
    setNetworkError(null)
  }

  const waitForTx = async (tx) => {
    setTx(tx.hash)
    await tx.wait()
    setTx('')
  }

  const _checkNetwork = () => {
    let chainId = parseInt(window.ethereum.chainId)
    //let networkName = chainId == 4 ? "rinkeby" : "mumbai"
    //setContractAddress(chainId == 4 ? rinkeby : mumbai)
    //setAssetsAddress(chainId == 4 ? rinkeby : mumbai)
    let networkName = chainId == 5 ? "development" : "geth"
    setContractAddress(chainId == 5 ? development : geth)
    setAssetsAddress(chainId == 5 ? development : geth)

    setNetwork(networkName)
  }

  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  if (!selectedAddress) {
    return (
      <ConnectWallet
        connectWallet={() => _connectWallet()}
        networkError={networkError}
        dismiss={() => _dismissNetworkError()}
      />
    );
  }


  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Assets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/erc20">Transfer ERC20</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/erc721">Transfer ERC721</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/erc1155">Transfer ERC1155</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/status">Status</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/staking">Staking</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/register-resource">Register Resource</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/query-resource">Query Resource</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add-relayer">Add Relayer</Link>
                </li>
              </ul>
            </li>
          </ul>
          {txBeingSent && (
            <WaitingForTransactionMessage txHash={txBeingSent} />
          )}

          {transactionError && (
            <TransactionErrorMessage
              message={transactionError.data.message}
              dismiss={() => setTxError('')}
            />
          )}
        </div>
      </div>
      <hr />

      <AppContext.Provider value={{ bridge, waitForTx, selectedAddress }}>
        <div className="row">
          <div className="col-12">
            <Route path="/erc20">
              <TransferCYT erc20={cyt} />
            </Route>
            <Route path="/erc721">
              <TransferCyborg erc721={cyborg} />
            </Route>
            <Route path="/erc1155">
              <TransferBadge erc1155={badge} />
            </Route>
            <Route path="/">
              <Collections erc20={cyt}
                erc721={cyborg} erc1155={badge}
                contractAddress={contractAddress} address={selectedAddress}
                network={network} />
            </Route>
            <Route path="/register-resource">
              <RegisterResource bridge={bridge} contractAddress={contractAddress} />
            </Route>
            <Route path="/query-resource">
              <QueryResource bridge={bridge} contractAddress={contractAddress} />
            </Route>
            <Route path="/add-relayer">
              <Admin bridge={bridge} contractAddress={contractAddress} />
            </Route>
            <Route path="/status">
              <Status api="http://localhost:8090" />
            </Route>
            <Route path="/staking">
              <Staking cyt={erc20} easyStaking />
            </Route>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
