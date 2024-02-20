import React from 'react'
import WrapperWithHeader from '../../components/Header'
import { HeadingText, Button, SmallText, Border } from '../../components/shared'
import ButtonWithImage from '../../components/ButtonWithImage'
import { Table } from '@digicatapult/ui-component-library'

const ViewConnections = () => {
  const handleBackToProfile = () => {
    window.location.href = `/ssi-profile`
  }
  return (
    <div>
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
                <ButtonWithImage
                  imagePath={'/images/secure_message_icon.svg'}
                  title={''}
                  optionalImageHeight="15px"
                ></ButtonWithImage>,
              ],
              [
                'Sams Batteries Company',
                <img
                  src={'/images/cross_icon.svg'}
                  style={{ height: '15px' }}
                ></img>,
                <ButtonWithImage
                  imagePath={'/images/secure_message_icon.svg'}
                  title={''}
                  optionalImageHeight="15px"
                ></ButtonWithImage>,
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
      </WrapperWithHeader>
    </div>
  )
}

export default ViewConnections
