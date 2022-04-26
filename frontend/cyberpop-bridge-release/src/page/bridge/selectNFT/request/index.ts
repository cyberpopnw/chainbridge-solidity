import { Contract } from 'ethers'
import axios from 'axios'
import { BigNumber } from 'ethers'
import { GlobalState } from '@/globalStateContent/globalState'
import { NFTItem } from '@/page/bridge/selectNFT/type'

/*
 * contracts[0]: ERC721
 * contracts[1]: ERC1155
*/
export const getTokenURIs = (contracts: (Contract | undefined)[], selectedAddress: GlobalState['selectedAddress']) => (
  Promise.all([
      // ERC 721
      contracts[0]?.callStatic?.tokensOfOwner(selectedAddress).then((ERC721Tokens: NFTItem['id'][]) => (
        Promise.all(ERC721Tokens.map(async ERC721Token => {
          const metaData = await contracts[0]?.callStatic.tokenURI(ERC721Token).then(res => (
            axios.get(res).then(res => res.data)
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

        // in mock contract, batchBalanceOf needs to query the balance of tokens held using the numOption parameter
        // so this should be the same as numOption in the contract
        const numOptions = 3

        const balances: NFTItem['amount'][] = await contracts[1]?.callStatic.batchBalanceOf(selectedAddress)

        for (let i = 0; i < numOptions; i++) {
          // results with a number of zero are excluded
          const balance = BigNumber.from(balances[i] || 0).toNumber()
          if (!balance) continue

          const id = i
          const baseURI = await contracts[1]?.callStatic.uri(id)
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
