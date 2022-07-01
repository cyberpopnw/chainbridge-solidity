import Nav from '@/component/Nav'

import TransparentTitle from '@/assets/images/transparent-title.webp'

import '@/page/home/index.scss'
import '@/scss/flex.scss'

import type { FC } from 'react'
import { Main } from '@/layout/main'
import Content from '@/layout/Content'
import { Spacer } from '@/component/Spacer'

const Home: FC = () => {
  return (
    <Main className="home">
      <Content>
        <Nav noPadding staticLogo menuPosition="center"/>
        <Spacer size="xl" />
        <div className="d-flex align-center flex-column">
          <img src={TransparentTitle} alt="NFT Bank: Secured Lending Platform" className="transparent-title"/>
          <h1 className="primary-title">
            NTF Bank: Secured Lending Platform
          </h1>
          <h2 className="secondary-title">
            Make your NFT assets flow efficiently
          </h2>
        </div>
      </Content>

    </Main>
  )
}

export default Home
