import { getChain } from '@/lib/chainIds'
import { ethereumAddress } from '@/utils/regexp'

import type { RulesProps } from '@arco-design/web-react'
import type { FormValues } from '@/page/bridge/SelectNFT/type'

const selectNFTFormRules: Record<keyof FormValues, RulesProps[]> = {
  'sourceChain': [
    { required: true, message: 'Source chain is required.' },
    {
      validator: (sourceChain, callback) => new Promise((resolve) => {
        if (sourceChain === 'unknown' || !getChain(sourceChain)) {
          callback('Source Chain is unknown.')
        }
        resolve('')
      })
    }
  ],
  'sourceAddress': [
    { required: true, message: 'Source address is required.' },
    { match: ethereumAddress, message: 'Source address must be Ethereum address' }
  ],
  'selectedNFTIndex': [
    { required: true, message: 'An NFT must be selected.' }
  ],
  'amount': []
}

export default selectNFTFormRules


