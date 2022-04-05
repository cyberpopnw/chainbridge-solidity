import styled from 'styled-components'
import { Button as ArcoButton } from '@arco-design/web-react'

export const ErrorPage = styled.div`
  text-align: center;
`

export const PrimaryTitle = styled.h1`
  color: #04FFA2;
  font-size: 5rem;
`

export const Content = styled.p`
  color: #ffffff;
  font-size: 3rem;
`

export const ConnectWalletButton = styled.button`
  border: transparent;
  background-color: #2D5CF6;
  padding: 2rem;
  font-size: 3rem;
  color: #FFFFFF;
  cursor: pointer;
  border-radius: 5px;
  transition: all .3s;

  :hover {
    background-color: #496fe3;
  }
`
