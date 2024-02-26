import React, { useState, useEffect, useCallback } from 'react'

import { SmallThinText, Button, ContentWrapper } from '../components/shared'
import WrapperWithHeader from '../components/Header'
import QRReaderSection from '../components/QRCode'
import { postConfirmApplication } from '../services/member/Onboarding'

const CompleteOnboardingPage = () => {
  const [hasScanned, setHasScanned] = useState(false)
  const [QrCodeContent, setQRCodeContent] = useState('')

  const handleBackToHomepage = () => {
    window.location.href = `/home`
  }
  const handleValueChange = useCallback(async () => {
    try {
      const response = await postConfirmApplication(QrCodeContent)

      if (response.status != 204) {
        throw new Error(`Status code: ${response.status}`)
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }, [QrCodeContent])
  useEffect(() => {
    handleValueChange()
  }, [handleValueChange])

  const ScanQR = () => {
    return (
      <>
        <SmallThinText>Complete the onboarding process</SmallThinText>
        <h2>Scan first QR code</h2>
        <QRReaderSection
          instructionText={`   You will find this in your email sent to you from the NICE Network.`}
          setHasScanned={setHasScanned}
          setQRCodeContent={setQRCodeContent}
        ></QRReaderSection>

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
