import styled from 'styled-components'
import { Link } from 'react-router-dom'

import type { FC } from 'react'
import { Grid } from '@arco-design/web-react'

const NavLink = styled(Link)`
  transition: all .3s;
  color: #ffffff;
  border-bottom: 3px solid #ffffff;
  //border-bottom: 3px solid #000;
  font-size: 2.5rem;
  font-weight: bold;
  text-decoration: none;

  :not(:last-child) {
    margin-right: 6rem;
  }
  
  :hover {
    color: #04FFA2;
    border-bottom: 3px solid #04FFA2;
  }
`

const Nav: FC = () => {
  return (
    <Grid.Row align="center" style={{ minWidth: '800px' }} >
      <Grid.Col span={2} offset={2}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 2,
          background: '#f7f7f7',
          cursor: 'text'
        }}
        />
      </Grid.Col>
      <Grid.Col span={16} offset={4}>
        <NavLink to="/nfts">NFTs</NavLink>
        <NavLink to="/bridge">Bridge</NavLink>
        <NavLink to="/docs">Docs</NavLink>
        <NavLink to="/listed">Listed</NavLink>
      </Grid.Col>
    </Grid.Row>
  )
}

export default Nav
