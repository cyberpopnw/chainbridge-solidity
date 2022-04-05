import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { ErrorPage, PrimaryTitle, ConnectWalletButton } from '@/layout/errorPage'

const NoWalletDetected = () => {
  const { connectWallet } = useGlobalStateContext()

  return (
    <ErrorPage>
      <PrimaryTitle>Please connect to your wallet.</PrimaryTitle>
      <ConnectWalletButton onClick={connectWallet}>Connect Wallet</ConnectWalletButton>
    </ErrorPage>
  )
}

export default NoWalletDetected
