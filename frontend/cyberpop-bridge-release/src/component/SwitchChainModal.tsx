import { Modal, Button, Typography, Space } from '@arco-design/web-react'

import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useEffect } from 'react'

import chainIds, { isSupportChain } from '@/lib/chainIds'
import { switchChain } from '@/lib/metamask'

import '@/scss/flex.scss'

const ChainButtonGroup = () => (
  <div className="d-flex justify-center align-center flex-column">
    <Space direction="vertical">
      {
        Object.values(chainIds)
          .filter(chain => chain.enable)
          .map(chain => (
            <Button long size="large" onClick={() => switchChain(chain.chainId)}>
              {chain.chainName}
            </Button>
          ))
      }
    </Space>
  </div>
)

const SwitchChainModal = () => {
  const { network } = useGlobalStateContext()

  useEffect(() => {
    if (network && !isSupportChain(network?.chainId)) {
      Modal.warning({
        title: <Typography.Text type="warning" bold>Please switch your network.</Typography.Text>,
        content: <ChainButtonGroup/>,
        footer: null
      })
    }

    return () => Modal.destroyAll()
  }, [network])

  return <></>
}

export default SwitchChainModal
