import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import { Border, SmallThinText } from '../components/shared'
import OwnCredential from '../components/Credentials'
import ButtonWithImage from '../components/ButtonWithImage'
import WrapperWithHeader from '../components/Header'

const SSIProfilePagePage = () => {
  return (
    <WrapperWithHeader>
      <div
        style={{
          flex: '1',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={'/images/profile_icon.svg'}
            style={{ height: '70px', marginRight: '10px' }}
          ></img>

          <ButtonWithImage
            title={'Share my NICE id'}
            imagePath={'/images/share_icon.svg'}
          ></ButtonWithImage>
        </div>

        <Section headingLevel={1} title="Your Profile" background={'#FFF'}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <OwnCredential
              title={'Your Company Name'}
              value={`Sam's Batteries`}
            ></OwnCredential>

            <OwnCredential
              title={'Companies House Number'}
              value={`12345678`}
            ></OwnCredential>

            <OwnCredential
              title={'Contact Email'}
              value={`sam@batteries.xyz`}
            ></OwnCredential>
          </div>
        </Section>

        <Border>
          <img
            src={'/images/check_icon.svg'}
            style={{ height: '15px', marginRight: '10px' }}
          ></img>
          <SmallThinText>
            Your Profile is verified by the nice network{' '}
          </SmallThinText>
        </Border>

        <ButtonWithImage
          title={'View your NICE connections'}
          imagePath={'/images/contact_icon.svg'}
          optionalMargin="10px"
          buttonClick={'ssi-profile/view-connections'}
        ></ButtonWithImage>
        <ButtonWithImage
          title={'Add connection'}
          imagePath={'/images/add_contact.svg'}
          optionalMargin="10px"
          buttonClick={'ssi-profile/add'}
        ></ButtonWithImage>
      </div>
    </WrapperWithHeader>
  )
}

export default SSIProfilePagePage
