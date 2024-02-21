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
import SendMessageButton from '../../components/Dialog'

const ViewConnections = () => {
  const handleBackToProfile = () => {
    window.location.href = `/ssi-profile`
  }
  const dialogRef = useRef(null)
  const dialogToastRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isToastOpen, setIsToastOpen] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => {
    const listener = () => {
      setIsOpen(false)
    }
    const dialog = dialogRef.current
    dialog?.addEventListener('close', listener)
    return () => dialog?.removeEventListener('close', listener)
  })
  useEffect(() => {
    const listener = () => {
      setIsToastOpen(false)
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
          height="200px"
          border="1px solid black"
          ref={dialogToastRef}
          includeClose={true}
        >
          <ContentWrapper style={{ padding: '50px 20px', width: '100%' }}>
            <SmallText>Your message:</SmallText>
            <SmallThinText>{message}</SmallThinText>

            <Button>Close</Button>
          </ContentWrapper>
        </DialogComponent>
      </div>
      <WrapperWithHeader>
        <HeadingText style={{ textDecoration: 'underline' }}>
          My Connected Companies
        </HeadingText>
        <Border>
          <Table
            headers={[
              <SmallText>Company Name</SmallText>,
              <SmallText> NICE-Verified</SmallText>,
              <SmallText>Message</SmallText>,
            ]}
            rows={[
              [
                'Ethan Exhaust Company',
                <img
                  src={'/images/check_icon.svg'}
                  style={{ height: '15px' }}
                ></img>,
                <SendMessageButton
                  imagePath={'/images/secure_message_icon.svg'}
                  title={''}
                  optionalImageHeight="15px"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  dialogRef={dialogRef}
                >
                  {' '}
                </SendMessageButton>,
              ],
              [
                'Sams Batteries Company',
                <img
                  src={'/images/cross_icon.svg'}
                  style={{ height: '15px' }}
                ></img>,
                <SendMessageButton
                  imagePath={'/images/secure_message_icon.svg'}
                  title={''}
                  optionalImageHeight="15px"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  dialogRef={dialogRef}
                >
                  {' '}
                </SendMessageButton>,
              ],
            ]}
          />
        </Border>
        <ButtonWithImage
          imagePath={'/images/share_icon.svg'}
          title={'Add Connection'}
          buttonClick={'ssi-profile/view-connections'}
        ></ButtonWithImage>
        <Button onClick={handleBackToProfile}>Back to Profile</Button>

        <DialogComponent
          width="90%"
          height="300px"
          border="1px solid black"
          ref={dialogRef}
          includeClose={true}
        >
          <ContentWrapper style={{ padding: '50px 20px' }}>
            <SmallThinText>
              Send a Message Query to Ethans Exhaust Company.
            </SmallThinText>
            <textarea
              placeholder="Add your secured and encrypted query here..."
              style={{ height: '70px', width: '90%', margin: '20px 0px' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row', // Change to 'row' for displaying buttons in a row
                alignItems: 'center',
                justifyContent: 'center', // Optional: Adjust based on your alignment preference
                textAlign: 'center',
              }}
            >
              <SendMessageButton
                title={'Close'}
                optionalImageHeight="15px"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dialogRef={dialogRef}
              >
                {' '}
              </SendMessageButton>
              <SendMessageButton
                title={'Send'}
                optionalImageHeight="15px"
                isOpen={isToastOpen}
                setIsOpen={setIsToastOpen}
                dialogRef={dialogToastRef}
              >
                {' '}
              </SendMessageButton>
            </div>
          </ContentWrapper>
        </DialogComponent>
      </WrapperWithHeader>
    </div>
  )
}

export default ViewConnections
