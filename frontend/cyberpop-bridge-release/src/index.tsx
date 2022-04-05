import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStateProvider from '@/globalStateContent'
import { Main } from '@/layout/main'

// Route Component
import Home from '@/page/home'
import Bridge from '@/page/bridge'
import Loan from '@/page/loan'
import ConnectWallet from '@/page/connectWallet'
import NoWalletDetected from '@/page/noWalletDetected'

// CSS
import '@/index.css'

ReactDOM.render(
  <BrowserRouter>
    <GlobalStateProvider>
      <Main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/bridge" element={<Bridge/>} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/no-wallet-detected" element={<NoWalletDetected />} />
        </Routes>
      </Main>
    </GlobalStateProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
