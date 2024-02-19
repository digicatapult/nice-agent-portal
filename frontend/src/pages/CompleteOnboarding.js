import React, { useState } from 'react'
import styled from 'styled-components'
import { QRReader } from '@digicatapult/ui-component-library'

import { SmallThinText, Button } from '../components/shared'
import WrapperWithHeader from '../components/Header'

const QRReaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  text-align: center;
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
    <WrapperWithHeader>
      <ContentWrapper>{hasScanned ? <Success /> : <ScanQR />}</ContentWrapper>
    </WrapperWithHeader>
  )
}

export default CompleteOnboardingPage
