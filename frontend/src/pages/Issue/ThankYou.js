import React from 'react'
import { Section } from '@digicatapult/ui-component-library'
import {
  Button,
  HeadingText,
  SmallCenteredThinText,
} from '../../components/shared'
import WrapperWithHeader from '../../components/Header'

export default function ThankYouPage({ handleBackToHomepage }) {
  return (
    <WrapperWithHeader>
      <HeadingText>Thank you!</HeadingText>
      <div
        style={{
          flex: '1',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Section
          margin={'2px 0px'}
          headingLevel={1}
          background={'#FFF'}
          padding={'0px 40px 20px 40px'}
        >
          <SmallCenteredThinText>
            Thank you for your request to join the NICE Network! Your onboarding
            details have been received.
          </SmallCenteredThinText>
          <br />
          <SmallCenteredThinText>
            2 QR codes will be given to you in both email and mail (within 2-3
            days to your address by your Companies House).{' '}
          </SmallCenteredThinText>
          <br />
          <SmallCenteredThinText>
            Please scan to complete the onboarding process.{' '}
          </SmallCenteredThinText>
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
      </div>
    </WrapperWithHeader>
  )
}
