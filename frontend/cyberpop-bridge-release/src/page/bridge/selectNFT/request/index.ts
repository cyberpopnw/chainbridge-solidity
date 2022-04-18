import { Contract } from 'ethers'
import axios from 'axios'
import { GlobalState } from '@/globalStateContent/globalState'
import { NFTItem } from '@/page/bridge/selectNFT/type'

/*
 * contracts[0]: ERC721
 * contracts[1]: ERC1155
 * ids[0]: ERC721
 * ids[1]: ERC1155
*/
export const getTokenURIs = (contracts: (Contract | undefined)[], selectedAddress: GlobalState['selectedAddress']) => (ids: unknown[][]) => (
  Promise.all([
      // ERC 721
      Promise.all(ids[0].map(async ERC721Token => {
        const tokenMetaData = await contracts[0]?.callStatic.tokenURI(ERC721Token).then(res => (
          axios.get(res).then(res => res.data)
        ))
        return Promise.resolve({
          standard: 'ERC721',
          amount: 1,
          ...tokenMetaData
        })
      })),
      // ERC1155
      new Promise(async (resolve) => {
        const balanceOfBatch = await contracts[1]?.callStatic.batchBalanceOf([selectedAddress], [ids[1]])
        const baseURI = await contracts[1]?.callStatic.uri(0)
        const tokenMetaData = await Promise.all(ids[1].map(id => axios.get(baseURI + id).then(res => res.data)))

        return resolve(ids[1].map((id, index) => ({
          id,
          standard: 'ERC1155',
          amount: balanceOfBatch[index],
          ...tokenMetaData[index]
        })))
      })
    ]
  ).then(result => result.flat() as NFTItem[])
)
