import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

export const useAuthedRedirect = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { selectedAddress } = useGlobalStateContext()

  return () => {
    if (selectedAddress) {
      navigate(searchParams.get('redirect') || '/')
    }
  }
}
