import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStateProvider from '@/globalStateContent'
import { Main } from '@/layout/main'

// Route Component
import Home from '@/page/home'
import Bridge from '@/page/bridge'

// CSS
import '@/index.css'
import Backgroud from '@/layout/Backgroud'

ReactDOM.render(
  <BrowserRouter>
    <GlobalStateProvider>
      <Main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/bridge" element={<Bridge/>} />
        </Routes>
      </Main>
    </GlobalStateProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
