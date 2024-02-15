import React from 'react'
import styled from 'styled-components'

import { SmallText } from '../components/shared'

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 80px auto;
  height: 100vh;
`

const TopRow = styled.div`
  grid-row: 1;
  text-align: center;
  align-items: center;
  display: grid;
`

const Content = styled.div`
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
  padding: 20px 20px 100px 20px;
`

const WrapperWithHeader = ({ children }) => {
  return (
    <Wrapper>
      <TopRow>
        <SmallText>- NICE Network -</SmallText>
      </TopRow>
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default WrapperWithHeader
