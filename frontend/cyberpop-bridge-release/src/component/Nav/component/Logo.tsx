import GifLogo from '@/assets/images/logo.gif'
import StaticLogo from '@/assets/images/logo.png'

import '@/component/Nav/index.scss'

import type { FC } from 'react'

type Props = {
  staticLogo?: boolean
}

const Logo: FC<Props> = ({ staticLogo }) => (
  staticLogo
    ? <img src={StaticLogo} alt="LOGO" className="nav__logo nav__logo--static"/>
    : (
        <div className="nav__logo-wrapper">
          <img src={StaticLogo} alt="LOGO" className="nav__logo nav__logo--static"/>
          <img src={GifLogo} alt="LOGO" className="nav__logo nav__logo--gif"/>
        </div>
      )
)

export default Logo
