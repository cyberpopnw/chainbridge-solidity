import Logo from '@/component/Nav/component/Logo'
import Menu from '@/component/Nav/component/Menu'
import WalletInfo from '@/component/Nav/component/WalletInfo'
import { Link } from 'react-router-dom'


import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import { isSupportChain } from '@/lib/chainIds'

import '@/component/Nav/index.scss'

import type { FC } from 'react'

type Props = {
  noPadding?: boolean,
  staticLogo?: boolean,
  menuPosition?: 'center' | 'left',
}

const Nav: FC<Props> = ({ noPadding = false, staticLogo = false, menuPosition = 'left' }) => {
  const { selectedAddress, network } = useGlobalStateContext()

  return (
    <nav
      className="nav"
      style={{
        padding: noPadding ? 'unset' : '1rem 5rem'
      }}
    >
      {
        menuPosition === 'left'
          ? (
            <div className="d-flex align-center">
              <Link to="/">
                <Logo staticLogo={staticLogo} />
              </Link>
              <Menu/>
            </div>
          )
          : (
            <>
              <Link to="/">
                <Logo staticLogo={staticLogo} />
              </Link>
              <Menu/>
            </>
          )
      }
      {
        selectedAddress && isSupportChain(network?.chainId)
          ? <WalletInfo/>
          : <></>
      }
    </nav>
  )
}

export default Nav
