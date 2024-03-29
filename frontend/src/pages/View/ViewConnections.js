import React, { useState, useEffect, useRef } from 'react'
import WrapperWithHeader from '../../components/Header'
import {
  HeadingText,
  Button,
  SmallText,
  Border,
  ContentWrapper,
  SmallThinText,
} from '../../components/shared'
import ButtonWithImage from '../../components/ButtonWithImage'
import {
  Table,
  Dialog as DialogComponent,
} from '@digicatapult/ui-component-library'
import { SendMessageButton } from '../../components/Dialog'
import { styled } from 'styled-components'

const ViewConnections = () => {
  const handleBackToProfile = () => {
    window.location.href = `/ssi-profile`
  }
  const dialogToastRef = useRef(null)
  const [isToastOpen, setIsToastOpen] = useState(false)
  const [message, setMessage] = useState('HARDCODED MESSAGE') //to be changed
  useEffect(() => {
    const listener = () => {
      setIsToastOpen(false)
      setMessage('')
    }
    const dialog = dialogToastRef.current
    dialog?.addEventListener('close', listener)
    return () => dialog?.removeEventListener('close', listener)
  })

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <DialogComponent
          width="100%"
          maxHeight="150px"
          border="1px solid black"
          ref={dialogToastRef}
          includeClose={true}
        >
          <ContentWrapper style={{ padding: '50px 20px', width: '100%' }}>
            <SmallThinText>
              Received message from Ethan&apos;s Exhaust Company:
            </SmallThinText>
            <SmallText>{message}</SmallText>
          </ContentWrapper>
        </DialogComponent>
      </div>
      <WrapperWithHeader>
        <HeadingText style={{ textDecoration: 'underline' }}>
          My Connected Companies
        </HeadingText>
        <Border>
          <StyledTable
            headers={[
              <SmallText key={crypto.randomUUID()}>Company Name</SmallText>,
              <SmallText key={crypto.randomUUID()}> NICE-Verified</SmallText>,
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
                  src={'/images/cross_icon.svg'}
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
        </Border>
        <SendMessageButton
          imagePath={'/images/secure_message_icon.svg'}
          title={''}
          optionalImageHeight="15px"
          isOpen={isToastOpen}
          setIsOpen={setIsToastOpen}
          dialogRef={dialogToastRef}
        >
          {' '}
        </SendMessageButton>

        <ButtonWithImage
          imagePath={'/images/add_contact.svg'}
          title={'Add Connection'}
          buttonClick={'ssi-profile/add'}
        ></ButtonWithImage>
        <Button onClick={handleBackToProfile}>Back to Profile</Button>
      </WrapperWithHeader>
    </div>
  )
}

const StyledTable = styled(Table)`
  td:nth-child(2) {
    text-align: center;
  }
`

export default ViewConnections
