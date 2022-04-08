import { Link } from '@arco-design/web-react'
import { PrimaryTitle, Content, ErrorPage } from '@/layout/errorPage'

const NoWalletDetected = () => {
  return (
    <ErrorPage>
      <PrimaryTitle>No Wallet Detected</PrimaryTitle>
      <Content>
        No Ethereum wallet was detected. <br/>
        Please install
        {/*<Button href="https://metamask.io" target="_blank" rel="noopener noreferrer">MetaMask</Button>*/}
      </Content>
    </ErrorPage>
  )
}

export default NoWalletDetected
