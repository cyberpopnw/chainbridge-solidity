import styled from 'styled-components'

import HomePageBackground from '@/assets/images/home-page-background.webp'

export const BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${HomePageBackground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
`
