import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStateProvider from '@/globalStateContent'

// Arco i18n
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';

// Route Component
import Home from '@/page/home'
import Bridge from '@/page/bridge'
// import CYT from '@/page/cyt'
import Loan from '@/page/loan'
import Log from '@/page/log'
import ConnectWallet from '@/page/connectWallet'
import NoWalletDetected from '@/page/noWalletDetected'

// CSS
import '@/scss/index.scss'
import { Main } from '@/layout/main'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={enUS}>
      <GlobalStateProvider>
        <Main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/bridge" element={<Bridge/>} />
            {/*<Route path="/erc20-cyt" element={<CYT/>} />*/}
            <Route path="/loan" element={<Loan />} />
            <Route path="/log" element={<Log />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/no-wallet-detected" element={<NoWalletDetected />} />
          </Routes>
        </Main>
      </GlobalStateProvider>
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

document.body.setAttribute('arco-theme', 'dark');
