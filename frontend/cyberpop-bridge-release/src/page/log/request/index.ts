import axios from 'axios'
import type { DepositsLog } from '@/page/log/type'

const request = axios.create({
  baseURL: 'http://13.215.244.17:8090'
})

export const getDepositLog = () => request.get<DepositsLog[]>('/deposits')
