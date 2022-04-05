import Nav from '@/page/home/layout/nav'
import Content from '@/page/home/layout/content'
import { PrimaryTitle, SecondaryTitle } from '@/component/Title'
import { FlexBetween } from '@/layout/flex'
import { Statistic, StatisticGroup } from '@/page/home/component/statistic'

import type { FC } from 'react'


const Home: FC = () => {
  return (
    <>
      <Nav />
      <Content>
        {/*Title*/}
        <div style={{ marginBottom: '15rem' }}>
          <PrimaryTitle>
            NTF Bank: Secured Lending Platform
          </PrimaryTitle>
          <SecondaryTitle>
            Make your NFT assets flow efficiently
          </SecondaryTitle>
        </div>
        {/* Data */}
        <StatisticGroup>
          <Statistic title="Current pool" value="$3213" />
          <Statistic title="APY" value="62%" />
          <Statistic title="NFTs" value="11231423" />
        </StatisticGroup>
        <FlexBetween>
        </FlexBetween>
      </Content>
    </>
  )
}

export default Home
