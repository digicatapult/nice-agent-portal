import React, { useState, useEffect, useRef } from 'react'
import WrapperWithHeader from '../../components/Header'
import styled from 'styled-components'
import {
  Border,
  SmallThinText,
  SmallText,
  HeadingText,
  ContentWrapper,
} from '../../components/shared'
import {
  Table,
  Dialog as DialogComponent,
} from '@digicatapult/ui-component-library'
import { RoundButton } from '../../components/Dialog'
import { getApprovedMemebers } from '../../services/admin'
const AdminPortal = () => {
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('HARDCODED MESSAGE') //to be changed
  const [approvedMembers, setApprovedMembers] = useState([])

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const approvedMembersData = await getApprovedMemebers()
        const members = []
        for (let i = 0; i < approvedMembersData.length; i++) {
          let member = approvedMembersData[i]
          members.push([
            { member },
            <RoundButton
              key={i}
              imagePath={'images/check_icon.svg'}
              title={''}
              optionalImageHeight="15px"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              dialogRef={dialogRef}
            >
              {' '}
            </RoundButton>,
          ])
        }
        setApprovedMembers(members)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchDataFromBackend()
  })
  useEffect(() => {
    const listener = () => {
      setIsOpen(false)
      setMessage('')
    }
    const dialog = dialogRef.current
    dialog?.addEventListener('close', listener)
    return () => dialog?.removeEventListener('close', listener)
  })

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
            rows={approvedMembers}
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
      <DialogComponent
        width="100%"
        maxHeight="150px"
        border="1px solid black"
        ref={dialogRef}
        includeClose={true}
      >
        <ContentWrapper style={{ padding: '50px 20px', width: '100%' }}>
          <SmallThinText>
            Received message from Ethan&apos;s Exhaust Company:
          </SmallThinText>
          <SmallText>{message}</SmallText>
        </ContentWrapper>
      </DialogComponent>
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
