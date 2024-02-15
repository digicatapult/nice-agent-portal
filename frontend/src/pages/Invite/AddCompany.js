import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import { ContainerStyle, HeadingText } from '../../components/shared'
import ButtonWithImage from '../../components/ButtonWithImage'
const InviteCompany = () => {
  return (
    <ContainerStyle>
      <Section
        margin={'40px 0px 0px 0px'}
        headingLevel={1}
        background={'#FFF'}
        title={'- NICE Network - '}
      ></Section>
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
          width: '45%',
        }}
      >
        <ButtonWithImage
          title={'Share my NICE ID'}
          imagePath={'/images/share_icon.svg'}
          optionalMargin="10px"
          optionalImageHeight="30px"
        ></ButtonWithImage>
        <ButtonWithImage
          title={'Scan their NICE ID QR code'}
          imagePath={'/images/complete_onboarding.svg'}
          optionalMargin="10px"
          optionalImageHeight="30px"
        ></ButtonWithImage>
        <ButtonWithImage
          title={'Invite them to NICE'}
          imagePath={'/images/invite_icon.svg'}
          optionalMargin="10px"
          optionalImageHeight="20px"
        ></ButtonWithImage>
      </div>
    </ContainerStyle>
  )
}

export default InviteCompany
