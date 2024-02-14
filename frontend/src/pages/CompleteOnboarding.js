import React, { useState } from 'react'
import styled from 'styled-components'
import { QRReader } from '@digicatapult/ui-component-library'

import {
  ContainerStyle,
  SmallThinText,
  SmallText,
  Button,
} from '../components/shared'

const QRReaderWrapper = styled.div`
  height: 100%;
  align-items: center;
  display: grid;
`

const CompleteOnboardingPage = () => {
  const [hasScanned, setHasScanned] = useState(false)

  const handleQrCode = (qr) => {
    // eslint-disable-next-line
    console.log(`Scanned: ${qr}`)
    setHasScanned(true)
  }

  const handleBackToHomepage = () => {
    window.location.href = `/home`
  }

  const ScanQR = () => {
    return (
      <>
        <SmallThinText>Complete the onboarding process</SmallThinText>
        <h2>Scan first QR code</h2>
        <SmallThinText>
          You will find this in your email sent to you from the NICE Network.
        </SmallThinText>
        <QRReaderWrapper>
          <QRReader
            viewFinderColor="#fff"
            viewFinderVariant="viewfinder-cross-med"
            onResult={handleQrCode}
            mirror={true}
          />
        </QRReaderWrapper>
        <SmallThinText>
          Please enable the camera access to scan the QR codes.
        </SmallThinText>
        <Button onClick={handleBackToHomepage}>{'<'}</Button>
      </>
    )
  }

  const Success = () => {
    return (
      <>
        <h2>Congratulations!</h2>
        <SmallThinText>
          Your organisation has now been onboarded into the NICE Network. You
          may now utilise your verified credentials in the SSI Profile to verify
          your identity with other organisations.
        </SmallThinText>
        <Button onClick={handleBackToHomepage}>Back to Homepage</Button>
      </>
    )
  }

  return (
    <ContainerStyle>
      <SmallText>- NICE Network -</SmallText>
      {hasScanned ? <Success /> : <ScanQR />}
    </ContainerStyle>
  )
}

export default CompleteOnboardingPage
