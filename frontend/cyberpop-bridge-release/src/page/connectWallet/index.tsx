import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { ErrorPage, PrimaryTitle, ConnectWalletButton } from '@/layout/errorPage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const NoWalletDetected = () => {
  const { connectWallet, selectedAddress } = useGlobalStateContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (selectedAddress) {
      navigate(searchParams.get('redirect') || '/')
    }
  }, [navigate, searchParams, selectedAddress])

  return (
    <ErrorPage>
      <PrimaryTitle>Please connect to your wallet.</PrimaryTitle>
      <ConnectWalletButton onClick={() => connectWallet?.()}>Connect Wallet</ConnectWalletButton>
    </ErrorPage>
  )
}

export default NoWalletDetected
