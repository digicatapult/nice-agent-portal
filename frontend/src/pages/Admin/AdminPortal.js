import React from 'react'
import WrapperWithHeader from '../../components/Header'
import styled from 'styled-components'
import {
  Border,
  SmallThinText,
  SmallText,
  HeadingText,
} from '../../components/shared'
import { Table } from '@digicatapult/ui-component-library'
const AdminPortal = () => {
  return (
    <WrapperWithHeader>
      <HeadingText style={{ textDecoration: 'underline' }}>
        NICE Admin Portal
      </HeadingText>
      <Border
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <div style={{ width: '100%', marginBottom: '40px' }}>
          <StyledTable
            headers={[
              <SmallText key={crypto.randomUUID()}>
                Pending Companies
              </SmallText>,
              <SmallThinText key={crypto.randomUUID()}> Approve</SmallThinText>,
            ]}
            rows={[
              [
                `Ethan's Exhaust Company`,
                <img
                  key={crypto.randomUUID()}
                  src={'/images/check_icon.svg'}
                  style={{ height: '15px' }}
                ></img>,
              ],
              [
                `Sam's Batteries Company`,
                <img
                  key={crypto.randomUUID()}
                  src={'/images/check_icon.svg'}
                  style={{ height: '15px' }}
                ></img>,
              ],
              [
                `Branson's Breaks Company`,
                <img
                  key={crypto.randomUUID()}
                  src={'/images/check_icon.svg'}
                  style={{ height: '15px' }}
                ></img>,
              ],
            ]}
          />
        </div>
        <div style={{ width: '100%' }}>
          <Table
            headers={[
              <SmallText key={crypto.randomUUID()}>
                Approved Companies
              </SmallText>,
            ]}
            rows={[
              [`Ethan's Exhaust Company`],
              [`Sam's Batteries Company`],
              [`Branson's Breaks Company`],
            ]}
          />
        </div>
      </Border>
    </WrapperWithHeader>
  )
}

export default AdminPortal

const StyledTable = styled(Table)`
  td:nth-child(2) {
    text-align: center;
  }
  width: 100%;
`
