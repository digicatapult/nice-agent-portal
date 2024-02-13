import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import {
  Input,
  Button,
  HeadingText,
  SmallItallicisedText,
  ContainerStyle,
} from '../../components/shared'

export default function CompanyDetailsForm({
  handleSubmit,
  inputs,
  setInputs,
  handleBackToHomepage,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }))
  }
  return (
    <div>
      <ContainerStyle>
        <Section
          margin={'40px 0px 0px 0px'}
          headingLevel={1}
          background={'#FFF'}
          title={'- NICE Network - '}
        ></Section>
        <HeadingText>Welcome to the NICE Network</HeadingText>
        <div
          style={{
            flex: '1',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
            <SmallItallicisedText>Your Company Name</SmallItallicisedText>
            <Input
              type="text"
              required
              name="name"
              value={inputs.name}
              placeholder="Company name"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <div>
              <Button
                onClick={(e) => {
                  handleBackToHomepage(e)
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
          </form>
        </div>
      </ContainerStyle>
    </div>
  )
}
