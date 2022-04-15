import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStateProvider from '@/globalStateContent'

// Route Component
import Home from '@/page/home'
import Bridge from '@/page/bridge'
import CYT from '@/page/cyt'
import Loan from '@/page/loan'
import ConnectWallet from '@/page/connectWallet'
import NoWalletDetected from '@/page/noWalletDetected'

// CSS
import '@/scss/index.scss'
import { Main } from '@/layout/main'

ReactDOM.render(
  <BrowserRouter>
    <GlobalStateProvider>
      <Main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/bridge" element={<Bridge/>} />
          <Route path="/erc20-cyt" element={<CYT/>} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/no-wallet-detected" element={<NoWalletDetected />} />
        </Routes>
      </Main>
    </GlobalStateProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
