import { Link } from '@arco-design/web-react'

import '@/scss/exceptionPage.scss';

const NoWalletDetected = () => {
  return (
    <div className="exception-page">
      <h3 className="exception-page__title">No Wallet Detected</h3>
      <p className="exception-page__content">
        No Ethereum wallet was detected.
        <br/>
        Please install <Link href="https://metamask.io" target="_blank" rel="noopener noreferrer">MetaMask</Link>
      </p>
    </div>
  )
}

export default NoWalletDetected
