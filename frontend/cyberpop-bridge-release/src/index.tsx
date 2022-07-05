import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStateProvider from '@/globalStateContent'
import SwitchChainModal from '@/component/SwitchChainModal'

// Arco i18n
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';

// Route Component
import Home from '@/page/home'
import Bridge from '@/page/bridge'
import ERC20Bridge from '@/page/erc20Bridge'
// import Loan from '@/page/loan'
import History from '@/page/history'
import ConnectWallet from '@/page/connectWallet'
import NoWalletDetected from '@/page/noWalletDetected'

// CSS
import '@/scss/index.scss'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={enUS}>
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/bridge" element={<Bridge/>}/>
          <Route path="/bridge/cyt" element={<ERC20Bridge/>}/>
          {/*<Route path="/loan" element={<Loan/>}/>*/}
          <Route path="/history" element={<History/>}/>
          <Route path="/connect-wallet" element={<ConnectWallet/>}/>
          <Route path="/no-wallet-detected" element={<NoWalletDetected/>}/>
        </Routes>
        <SwitchChainModal />
      </GlobalStateProvider>
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

document.body.setAttribute('arco-theme', 'dark');
