import axios from 'axios'
import type { DepositsHistory } from '@/page/history/type'

const request = axios.create({
  baseURL: 'https://apibridge.cyberpop.online'
})

export const getDepositHistory = () => request.get<DepositsHistory[]>('/deposits')
  .then(({ data }) => Array.isArray(data) ? data : undefined)
