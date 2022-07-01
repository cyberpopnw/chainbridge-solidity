import { Link, LinkProps } from 'react-router-dom'
import '@/component/Nav/index.scss'
import type { FC } from 'react'

const NavLink: FC<LinkProps> = ({ children, ...props }) => (
  <Link {...props} className="nav__link">
    <span>{ children }</span>
  </Link>
)

export default NavLink
