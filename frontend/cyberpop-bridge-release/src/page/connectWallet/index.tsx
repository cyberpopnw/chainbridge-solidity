import { Button, Message } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useAuthedRedirect } from '@/hooks/useAuthedRedirect'

import '@/scss/exceptionPage.scss';

const NoWalletDetected = () => {
  const { connectWallet } = useGlobalStateContext()
  const authedRedirect = useAuthedRedirect()

  const { run, loading } = useRequest(() => {
    return connectWallet ? connectWallet() : Promise.reject({
      message: 'connect wallet function is not defined.'
    })
  }, {
    manual: true,
    onSuccess: authedRedirect,
    onError (e) {
      Message.error(e.message)
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
