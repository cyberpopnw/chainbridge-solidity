import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import { ethers } from "ethers"
import { Link, Route } from "wouter"
import { NoWalletDetected } from "./components/NoWalletDetected"
import { ConnectWallet } from "./components/ConnectWallet"
import { WaitingForTransactionMessage } from "./components/WaitingForTransactionMessage"
import { TransactionErrorMessage } from "./components/TransactionErrorMessage"
import { Transfer } from "./components/Transfer"

function App() {
  const [selectedAddress, setAddress] = useState(null)
  const [network, setNetwork] = useState('')
  const [networkError, setNetworkError] = useState(null)
  const [txBeingSent, setTx] = useState('')
  const [transactionError, setTxError] = useState(null)
  const _connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(selectedAddress)
    _checkNetwork()
  }

  const _dismissNetworkError = async () => {
    setNetworkError(null)
  }

  const _checkNetwork = () => {
    let chainId = parseInt(window.ethereum.chainId)
    let networkName = chainId == 4 ? "rinkeby" : "mumbai"
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
              <Link className="nav-link" to="/">Transfer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register-resource">Register Resource</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/query-resource">Query Resource</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/query-proposal">Query Proposal</Link>
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

      <div className="row">
        <div className="col-12">
          <Route path="/">
            <Transfer />
          </Route>
          <Route path="/register-resource">
          </Route>
          <Route path="/query-resource">
          </Route>
          <Route path="/query-proposal">
          </Route>
        </div>
      </div>
    </div>
  );
}

export default App;
