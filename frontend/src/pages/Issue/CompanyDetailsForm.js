import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import {
  Input,
  Button,
  HeadingText,
  SmallItallicisedText,
  ContainerStyle,
} from '../../components/shared'

export default function CompanyDetailsForm({ handleSubmit, inputs }) {
  return (
    <ContainerStyle>
      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Section
          margin={'2px 0px'}
          headingLevel={1}
          background={'#FFF'}
          title={'- NICE Network - '}
        >
          {/* <span style={{ fontSize: '8px' }}>Enter details</span> */}
        </Section>
        <HeadingText>Welcome to the NICE Network</HeadingText>
        {/* <Section margin={'2px 0px'} headingLevel={2} background={'#FFF'}> */}
        <SmallItallicisedText>Your Company Name</SmallItallicisedText>
        <Input
          type="text"
          required
          name="name"
          value={inputs.name}
          placeholder="Company name"
        />
        <SmallItallicisedText>
          Enter your Companies House Number
        </SmallItallicisedText>
        <Input
          required
          type="text"
          pattern="^[a-zA-Z0-9]{8}$"
          name={'houseNo'}
          value={inputs.houseNo}
          placeholder="Company house no."
        />
        <SmallItallicisedText>
          We will send your onboarding QR code here
        </SmallItallicisedText>
        <Input
          type="email"
          required
          value={inputs.email}
          name="email"
          placeholder="Contact email"
        />
        <div>
          <Button
            onClick={() => {
              window.location.href = `/home`
            }}
          >
            {'<'}
          </Button>
          <Button
            type="submit"
            style={{ marginTop: '25px', marginLeft: '2px' }}
          >
            Next
          </Button>
        </div>
        {/* </Section> */}
      </form>
    </ContainerStyle>
  )
}
