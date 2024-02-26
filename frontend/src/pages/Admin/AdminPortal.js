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
import { getMemebers } from '../../services/admin'
import QRCode from 'react-qr-code'
const AdminPortal = () => {
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [notApprovedMembers, setNotApprovedMembers] = useState([])
  const [approvedMembers, setApprovedMembers] = useState([])
  const [QRcontent, setQRcontent] = useState('')

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const membersData = await getMemebers()
        const notApprovedMembersData = membersData.filter(
          (item) => item.status === 'pending'
        )
        const approvedMembersData = membersData.filter(
          (item) => item.status === 'approved'
        )

        const notApprovedMembers = notApprovedMembersData.map((member) => [
          <>{member.companyName}</>,
          <RoundButton
            key={member.id}
            imagePath={'images/check_icon.svg'}
            title={''}
            optionalImageHeight="15px"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            dialogRef={dialogRef}
            setQRContent={setQRcontent}
            contentKey={member.id}
          ></RoundButton>,
        ])
        const approvedMembers = approvedMembersData.map((member) => [
          <>{member.companyName}</>,
        ])

        setNotApprovedMembers(notApprovedMembers)
        setApprovedMembers(approvedMembers)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error)
      }
    }
    fetchDataFromBackend()
  }, [])
  useEffect(() => {
    const listener = () => {
      setIsOpen(false)
    }
    const dialog = dialogRef.current
    dialog?.addEventListener('close', listener)
    return () => dialog?.removeEventListener('close', listener)
  }, [])

  return (
    <WrapperWithHeader>
      <HeadingText style={{ textDecoration: 'underline' }}>
        NICE Admin Portal
      </HeadingText>
      <Border
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
      >
        <div style={{ width: '100%', marginBottom: '40px' }}>
          <StyledTable
            headers={[
              <SmallText key={crypto.randomUUID()}>
                Pending Companies
              </SmallText>,
              <SmallThinText key={crypto.randomUUID()}> Approve</SmallThinText>,
            ]}
            rows={notApprovedMembers}
          />
        </div>
        <div style={{ width: '100%' }}>
          <Table
            headers={[
              <SmallText key={crypto.randomUUID()}>
                Approved Companies
              </SmallText>,
            ]}
            rows={approvedMembers}
          />
        </div>
      </Border>
      <DialogComponent
        maxHeight="400px"
        border="1px solid black"
        ref={dialogRef}
        includeClose={true}
      >
        <ContentWrapper style={{ padding: '50px 20px', width: '100%' }}>
          <SmallThinText>
            Scan QR Code to complete the onboarding please:
          </SmallThinText>

          <div style={{ padding: '40px 20px' }}>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={QRcontent}
              viewBox={`0 0 256 256`}
            />
          </div>
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
