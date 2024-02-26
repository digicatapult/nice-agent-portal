import React from 'react'
import styled from 'styled-components'

import { Section } from '@digicatapult/ui-component-library'
import {
  Button,
  SmallText,
  HeadingText,
  SmallCenteredThinText,
  SmallThinText,
} from '../../components/shared'
import WrapperWithHeader from '../../components/Header'
import { postSubmitApplication } from '../../services/member/Onboarding'

export default function Summary({ inputs, setStage }) {
  const InformationArea = styled.div`
    padding: 10px;
  `

  const handleSubmitApplication = async () => {
    try {
      const requestBody = {
        companyName: inputs.name,
        companiesHouseNumber: inputs.companiesHouseNumber,
        email: inputs.email,
      }
      const response = await postSubmitApplication(requestBody)
      console.log(response)

      if (response.status !== 204) {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error sending data:', error)
    }
  }
  return (
    <WrapperWithHeader>
      <HeadingText>Welcome to the NICE Network</HeadingText>
      <div
        style={{
          flex: '1',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'left', padding: '0px 20px' }}>
          <SmallThinText style={{ paddingBottom: '20px' }}>
            Review Your Details before submission:
          </SmallThinText>
          <InformationArea>
            <SmallText>
              <b>Company Name: </b>
            </SmallText>
            <SmallThinText>{inputs.name}</SmallThinText>
          </InformationArea>
          <InformationArea>
            <SmallText>
              <b>Company House No.: </b>
            </SmallText>
            <SmallThinText>{inputs.houseNo}</SmallThinText>
          </InformationArea>
          <InformationArea>
            <SmallText>
              <b>Company Email: </b>
            </SmallText>
            <SmallThinText>{inputs.email}</SmallThinText>
          </InformationArea>
        </div>
        <Section
          margin={'2px 0px'}
          headingLevel={1}
          background={'#FFF'}
          padding={'0px 40px 20px 40px'}
        >
          <SmallCenteredThinText>
            *Ensure your details are valid to receive the onboarding QR codes
            from your mail (Companies House Number address) and contact email.
          </SmallCenteredThinText>
        </Section>

        <div>
          {' '}
          <Button
            onClick={(e) => {
              e.preventDefault()
              setStage((prev) => prev - 1)
            }}
          >
            {'<'}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault()
              setStage((prev) => prev + 1)
              // eslint-disable-next-line
              console.log(Math.floor(1000 + Math.random() * 9000).toString())
              // should be doing sth to send the qr text
              handleSubmitApplication()
            }}
          >
            {'Submit'}
          </Button>
        </div>
      </div>
    </WrapperWithHeader>
  )
}
