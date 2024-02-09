import React from 'react'

import { Section } from '@digicatapult/ui-component-library'
import {
  Button,
  SmallText,
  HeadingText,
  ContainerStyle,
  SmallCenteredThinText,
  SmallThinText,
} from '../../components/shared'

export default function Summary({ inputs, setStage }) {
  return (
    <ContainerStyle>
      <SmallText>- NICE Network - </SmallText>
      <HeadingText>Welcome to the NICE Network</HeadingText>
      <div style={{ textAlign: 'left', padding: '0px 20px' }}>
        <SmallThinText style={{ paddingBottom: '20px' }}>
          Review Your Details before submission:
        </SmallThinText>

        <SmallText>
          <b>Company Name: </b>
        </SmallText>
        <SmallThinText>{inputs.name}</SmallThinText>

        <SmallText>
          <b>Company House No.: </b>
        </SmallText>
        <SmallThinText>{inputs.houseNo}</SmallThinText>

        <SmallText>
          <b>Company Email: </b>
        </SmallText>
        <SmallThinText>{inputs.email}</SmallThinText>
      </div>
      <Section
        margin={'2px 0px'}
        headingLevel={1}
        background={'#FFF'}
        padding={'0px 40px 20px 40px'}
      >
        <SmallCenteredThinText>
          *Ensure your details are valid to receive the onboarding QR codes from
          your mail (Companies House Number address) and contact email.
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
            // should be doing sth to send the qr text
          }}
        >
          {'Submit'}
        </Button>
        {/* <Button
          onClick={(e) => {
            handleSubmit(e, true)
          }}
        >
          {'Submit'}
        </Button> */}
      </div>
    </ContainerStyle>
  )
}
