import { getChain } from '@/lib/chainIds'
import { ethereumAddress } from '@/utils/regexp'

import type { FormValues } from '@/page/bridge/TransferTo/type'
import type { RulesProps } from '@arco-design/web-react'

const FormRules: Record<keyof FormValues, RulesProps[]> = {
  targetAddress: [
    { required: true, message: 'Target address is required.' },
    { match: ethereumAddress, message: 'Target address must be Ethereum address' }
  ],
  targetChain: [
    {
      required: true, message: 'Target chain is required.',
      validator: (targetChain, callback) => new Promise((resolve) => {
        if (!getChain(targetChain)) {
          callback('Selected chain not supported.')
        }
        resolve('')
      })
    }
  ]
}

export default FormRules
