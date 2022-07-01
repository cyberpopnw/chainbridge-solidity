import { Dropdown } from '@arco-design/web-react'
import NavLink from '@/component/Nav/component/NavLink'

import '@/component/Nav/index.scss'

const BridgeMenu = () => (
  <div className="nav__sub-menu">
    <NavLink to="/bridge">NFT</NavLink>
    <NavLink to="/bridge/cyt">CYT</NavLink>
  </div>
)

const Menu = () => {
  return (
    <div className="nav__menu">
      <Dropdown droplist={<BridgeMenu/>}>
        <span className="nav__link">
          Bridge
        </span>
      </Dropdown>
      <NavLink to="/history">History</NavLink>
    </div>
  )
}

export default Menu

