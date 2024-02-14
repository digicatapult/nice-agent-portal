import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import {
  ContainerStyle,
  HeadingText,
  Button,
  SmallThinText,
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
        <HeadingText>SSI Profile Page</HeadingText>
        <div>
          <img src={'/images/ssi_profile.png'}></img>
          <Button
            type="submit"
            style={{ marginTop: '25px', marginLeft: '2px' }}
          >
            Share my NICE id
          </Button>
        </div>
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
          <div style={{ border: '2px solid black ' }}>
            <Section
              headingLevel={1}
              background={'#FFF'}
              border={'2px solid black'}
              title={'Your Profile is verified by the nice network '}
            ></Section>
          </div>
        </Section>
        <Button type="submit" style={{ marginTop: '25px', marginLeft: '2px' }}>
          View your NICE connections
        </Button>
        <Button type="submit" style={{ marginTop: '25px', marginLeft: '2px' }}>
          Add connection
        </Button>
      </ContainerStyle>
    </div>
  )
}

export default SSIProfilePagePage
