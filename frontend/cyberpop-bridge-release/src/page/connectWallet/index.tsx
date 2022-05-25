import { Button, Modal, Message } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useAuthedRedirect } from '@/hooks/useAuthedRedirect'

import type { MetaMaskError } from '@/types/metamaskError'

import '@/scss/exceptionPage.scss';

const NoWalletDetected = () => {
  const { connectWallet } = useGlobalStateContext()
  const authedRedirect = useAuthedRedirect()

  const { run, loading } = useRequest(() => {
    return connectWallet ? connectWallet() : Promise.reject({
      message: 'connect wallet function is not defined.'
    })
  }, {
    onSuccess: authedRedirect,
    onError (e) {
      const { code } = e as unknown as MetaMaskError
      if (code === 4001) {
        Message.warning(e.message)
        return
      }
      setTimeout(() => window.location.reload(), 3000)
      Modal.warning({
        title: 'An error occurred, Please refresh the page.',
        content: 'You can manually refresh the page or wait 3 seconds for the page to refresh automatically.',
        okText: 'Refresh',
        onOk: () => window.location.reload()
      })
    }
  })

  return (
    <div className="exception-page">
      <h3 className="exception-page__title">Please connect to your wallet.</h3>
      <Button className="exception-page__button" loading={loading} onClick={run}>Connect Wallet</Button>
    </div>
  )
}

export default NoWalletDetected
