import { Image as ArcoImage } from '@arco-design/web-react'
import styled from 'styled-components'

import type { FC } from 'react';
import type { ImageProps } from '@arco-design/web-react'

const ErrorImageWrapper = styled.div`
  width: 15rem;
  height: 15rem;
  margin: 0 auto;
  background-color: #E2E2E2;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`

const Img: FC<ImageProps> = (props) => (
  <ArcoImage
    error={
      <ErrorImageWrapper>
        <img src="https://d2cimmz3cflrbm.cloudfront.net/nwhome/ba5fcf2b4854eebdc64dc80089f2cc26.png" alt=""/>
      </ErrorImageWrapper>
    }
    {...props}
  />
)

export default Img



