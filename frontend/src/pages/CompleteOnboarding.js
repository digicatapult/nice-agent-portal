import React from 'react'
import { Section, QRReader } from '@digicatapult/ui-component-library'
import { ContainerStyle, SmallThinText } from '../components/shared'

const handleQrCode = (qr) => {
  console.log(qr)
}

const CompleteOnboardingPage = () => {
  return (
    <ContainerStyle>
      <Section
        margin={'40px 0px 0px 0px'}
        headingLevel={1}
        background={'#FFF'}
        title={'- NICE Network -'}
      ></Section>
      <SmallThinText>Complete the onboarding process</SmallThinText>
      <h1>Scan first QR code</h1>
      <SmallThinText>
        You will find this in your email sent to you from the NICE Network.
      </SmallThinText>
      <QRReader
        viewFinderColor="#fff"
        viewFinderVariant="viewfinder-cross-med"
        onResult={handleQrCode}
        mirror="true"
      />
      <SmallThinText>
        Please enable the camera access to scan the QR codes.
      </SmallThinText>
    </ContainerStyle>
  )
}

export default CompleteOnboardingPage
