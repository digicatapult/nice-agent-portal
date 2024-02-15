import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import { SmallThinText } from '../components/shared'
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

        <div
          style={{
            border: '1px solid black ',
            padding: '10px',
            marginTop: '10px',
            marginBottom: '90px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={'/images/check_icon.svg'}
            style={{ height: '15px', marginRight: '10px' }}
          ></img>
          <SmallThinText>
            Your Profile is verified by the nice network{' '}
          </SmallThinText>
        </div>

        <ButtonWithImage
          title={'View your NICE connections'}
          imagePath={'/images/contact_icon.svg'}
          optionalMargin="10px"
        ></ButtonWithImage>

        <ButtonWithImage
          title={'Add connection'}
          imagePath={'/images/add_contact.svg'}
          optionalMargin="10px"
        ></ButtonWithImage>
      </div>
    </WrapperWithHeader>
  )
}

export default SSIProfilePagePage
