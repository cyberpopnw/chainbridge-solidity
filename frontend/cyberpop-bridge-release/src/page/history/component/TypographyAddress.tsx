import { Tooltip, Typography, Link } from '@arco-design/web-react'

import type { FC } from 'react'
import type { Chain } from '@/lib/chainIds'

type Props = {
  chain?: Chain;
  address: string;
}

const TypographyAddress: FC<Props> = ({ chain, address }) => {
  return (
    <Typography.Text className="m-0" bold copyable>
      <Tooltip position="tl" content={address}>
        {
          chain
            ? (
              <Link target="__target" href={`${chain.blockExplorerUrls}/address/${address}`}>
                {`${address.slice(0, 7)}*****${address.slice(address.length - 4)}`}
              </Link>
            )
            : address
        }
      </Tooltip>
    </Typography.Text>
  )
}

export default TypographyAddress
