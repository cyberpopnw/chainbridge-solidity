import axios from 'axios'
import { BigNumber } from 'ethers'

import { ERC1155TokenList } from '@/lib/ERC1155TokenList'

import type { Contract } from 'ethers'
import type { GlobalState } from '@/globalStateContent/globalState'
import type { NFTItem } from '@/page/bridge/selectNFT/type'

/*
 * contracts[0]: ERC721
 * contracts[1]: ERC1155
*/
export const getTokenURIs = (contracts: (Contract | undefined)[], selectedAddress: GlobalState['selectedAddress']) => (
  Promise.all([
      // ERC 721
      contracts[0]?.tokensOfOwner(selectedAddress).then((ERC721Tokens: NFTItem['id'][]) => (
        Promise.all(ERC721Tokens.map(async ERC721Token => {
          const metaData = await contracts[0]?.tokenURI(ERC721Token).then((uri: string) => (
            axios.get(uri).then(res => res.data)
          ))
          return Promise.resolve({
            id: ERC721Token,
            standard: 'ERC721',
            ...metaData
          })
        })))
      ),
      // ERC1155
      new Promise(async (resolve) => {
        const result = []

        const balances: NFTItem['amount'][] = await contracts[1]?.balanceOfBatch(
          Array.from({ length: ERC1155TokenList.length }, () => selectedAddress || ''),
          ERC1155TokenList
        )

        for (let i = 0; i < ERC1155TokenList.length; i++) {
          // results with a number of zero are excluded
          const balance = BigNumber.from(balances[i] || 0).toNumber()
          if (!balance) continue

          const id = ERC1155TokenList[i]
          const baseURI = await contracts[1]?.uri(id)
          const { data: metaData } = await axios.get(baseURI + id)
          result.push({
            id,
            amount: balance,
            standard: 'ERC1155',
            ...metaData
          })
        }
        return resolve(result)
      })
    ]
  ).then(result => result.flat() as NFTItem[])
)
