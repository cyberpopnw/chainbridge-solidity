import styled from 'styled-components'

import type { FC } from 'react'
import { FlexCenter } from '@/layout/flex'

const Title = styled.p`
  // TODO: Font
  font-size: 2rem;
  margin: 0;
  color: #ffffff;
  font-weight: bold;
`

const Value = styled.p`
  font-size: 3rem;
  margin: 0;
  color: #ffffff;
`

export const Statistic: FC<{
  title: string;
  value: string | number
}> = ({ title, value }) => (
  <FlexCenter style={{ flexDirection: "column" }}>
    <Value>{ value }</Value>
    <Title>{ title }</Title>
  </FlexCenter>
)

export const StatisticGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80rem;
`
