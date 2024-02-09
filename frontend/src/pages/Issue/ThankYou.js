import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import {
  Input,
  Button,
  HeadingText,
  SmallItallicisedText,
  ContainerStyle,
  SmallThinText,
} from '../../components/shared'
export default function ThankYouPage({
  inputs,
  setStage,
  handleBackToHomepage,
}) {
  return (
    <ContainerStyle>
      <Section
        margin={'2px 0px'}
        headingLevel={1}
        background={'#FFF'}
        title={'- NICE Network - '}
      ></Section>

      <HeadingText>Thank you!</HeadingText>
      <Section
        margin={'2px 0px'}
        headingLevel={1}
        background={'#FFF'}
        padding={'0px 40px 20px 40px'}
      >
        <SmallThinText>
          Thank you for your request to join the NICE Network! Your onboarding
          details have been received.
        </SmallThinText>
        <br />
        <SmallThinText>
          2 QR codes will be given to you in both email and mail (within 2-3
          days to your address by your Companies House).{' '}
        </SmallThinText>
        <br />
        <SmallThinText>
          Please scan to complete the onboarding process.{' '}
        </SmallThinText>
      </Section>
      <div>
        <Button
          onClick={(e) => {
            handleBackToHomepage(e, true)
          }}
        >
          {'Back to Homepage'}
        </Button>
      </div>
    </ContainerStyle>
  )
}
