// Component
import { Dropdown, Menu, Typography, Space } from '@arco-design/web-react'
// Hooks
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
// Utils
import chainIds, { getChain, isSupportChain } from '@/lib/chainIds'
import { switchChain } from '@/lib/metamask'
// Scss
import '@/scss/flex.scss'
import '@/component/Nav/index.scss'


const ChainMenu = () => {
  const { network } = useGlobalStateContext()

  return (
    <Menu>
      {
        Object.keys(chainIds).map(key => {
          const current = chainIds[key]

          return (
            <Menu.Item key={current.chainName} className={network?.chainId === current.chainId ? 'arco-menu-selected' : '' }>
              <div onClick={() => switchChain(current.chainId)} className="nav__chain-menu-item">
                <img src={current.logo} alt={`${current.chainName} logo`} className="nav__chain-menu__logo" />
                {current.chainName}
              </div>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )
}


const WalletInfo = () => {
  const { network, selectedAddress } = useGlobalStateContext()
  const currentChain = getChain(network?.chainId)

  return (
    isSupportChain(network?.chainId)
      ? (
        <Dropdown droplist={<ChainMenu />}>
          <Space direction="horizontal" size="medium" className="nav__account">
            <img src={currentChain?.logo} alt={currentChain?.chainName} className="nav__chain-menu__logo"/>
            <Typography.Text className="nav__account__address">
              { `${selectedAddress?.slice(0, 5)}*****${selectedAddress?.slice(selectedAddress?.length - 4)}` }
            </Typography.Text>
          </Space>
        </Dropdown>
      )
      : <></>
  )
}

export default WalletInfo
