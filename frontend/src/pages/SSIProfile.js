import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import {
  ContainerStyle,
  Button,
  SmallThinText,
  CenteredContainer,
  InformationArea,
} from '../components/shared'
const SSIProfilePagePage = () => {
  return (
    <div>
      <ContainerStyle>
        <Section
          margin={'40px 0px 0px 0px'}
          headingLevel={1}
          background={'#FFF'}
          title={'- NICE Network - '}
        ></Section>
        <div
          style={{
            flex: '1',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CenteredContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={'/images/profile_icon.svg'}
                style={{ height: '70px', marginRight: '10px' }}
              ></img>
              <Button
                type="submit"
                style={{
                  marginLeft: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img src={'/images/share_icon.svg'}></img>
                Share my NICE id
              </Button>
            </div>
          </CenteredContainer>

          <Section headingLevel={1} title="Your Profile" background={'#FFF'}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <b>Your Company Name: </b>
                <SmallThinText>Sam's Batteries</SmallThinText>
              </div>
              <div style={{ display: 'flex' }}>
                <b>Companies House Number: </b>
                <SmallThinText>12345678</SmallThinText>
              </div>
              <div style={{ display: 'flex' }}>
                <b>Contact Email: </b>
                <SmallThinText>sam@batterie.xyz</SmallThinText>
              </div>
            </div>
          </Section>

          <InformationArea>
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
          </InformationArea>

          <Button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <img
              src={'/images/contact_icon.svg'}
              style={{ height: '20px', marginRight: '10px' }}
            ></img>
            View your NICE connections
          </Button>
          <Button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <img
              src={'/images/add_contact.svg'}
              style={{ height: '20px', marginRight: '10px' }}
            ></img>
            Add connection
          </Button>
        </div>
      </ContainerStyle>
    </div>
  )
}

export default SSIProfilePagePage
