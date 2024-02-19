import React from 'react'
import { HeadingText, Button } from '../../components/shared'
import ButtonWithImage from '../../components/ButtonWithImage'
import WrapperWithHeader from '../../components/Header'

const InviteCompany = () => {
  return (
    <WrapperWithHeader>
      <img
        src={'/images/add_contact.svg'}
        style={{ height: '100px', margin: '10px' }}
      ></img>
      <HeadingText>Add Company to your Connections</HeadingText>
      <div
        style={{
          flex: '1',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '180px',
        }}
      >
        <ButtonWithImage
          title={'Share my NICE ID'}
          imagePath={'/images/share_icon.svg'}
          optionalMargin="10px"
          optionalImageHeight="30px"
          buttonClick={'ssi-profile/add/share-nice-id'}
        ></ButtonWithImage>
        <ButtonWithImage
          title={'Scan their NICE ID QR code'}
          imagePath={'/images/complete_onboarding.svg'}
          optionalMargin="10px"
          optionalImageHeight="30px"
          buttonClick={'ssi-profile/add/scan-nice-id'}
        ></ButtonWithImage>
        <ButtonWithImage
          title={'Invite them to NICE'}
          imagePath={'/images/invite_icon.svg'}
          optionalMargin="10px"
          optionalImageHeight="20px"
          buttonClick={'ssi-profile/add/invite-to-nice'}
        ></ButtonWithImage>
        <Button
          onClick={() => {
            window.location.href = `/ssi-profile`
          }}
        >
          {' '}
          {'<'}
        </Button>
      </div>
    </WrapperWithHeader>
  )
}

export default InviteCompany
