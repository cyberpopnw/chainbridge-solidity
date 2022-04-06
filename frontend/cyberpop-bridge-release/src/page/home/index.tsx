import Nav from '@/page/home/component/nav'
import Content from '@/page/home/layout/content'

import { FlexBetween } from '@/layout/flex'
import { BackgroundImg } from '@/page/home/layout/background'
import { PrimaryTitle, SecondaryTitle } from '@/layout/title'
import { TitleWrapper } from '@/page/home/layout/titleWrapper'

import { Statistic, StatisticGroup } from '@/page/home/component/statistic'

import TransparentTitle from '@/assets/images/transparent-title.webp'


import type { FC } from 'react'

const Home: FC = () => {
  return (
    <>
      <BackgroundImg />
      <Nav />
      <Content>
        {/*Title*/}
        <TitleWrapper>
          <img src={TransparentTitle} alt="NFT Bank: Secured Lending Platform" className="transparent-title" />
          <PrimaryTitle className="primary-title">
            NTF Bank: Secured Lending Platform
          </PrimaryTitle>
          <SecondaryTitle className="secondary-title">
            Make your NFT assets flow efficiently
          </SecondaryTitle>
        </TitleWrapper>
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
