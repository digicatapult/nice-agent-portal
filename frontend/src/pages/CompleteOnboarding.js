import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { SmallThinText, Button, ContentWrapper } from '../components/shared'
import WrapperWithHeader from '../components/Header'
import QRReaderSection from '../components/QRCode'
import { postConfirmApplication } from '../services/member/Onboarding'

const ErrorText = styled.h2`
  color: red;
`

const CompleteOnboardingPage = () => {
  const [qrCodeContent, setQrCodeContent] = useState('')
  const [confirmAppError, setConfirmAppError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleBackToHomepage = () => {
    window.location.href = `/home`
  }
  const handleValueChange = useCallback(async () => {
    const response = await postConfirmApplication(qrCodeContent)
    const error = await response.json()
    switch (response.status) {
      case 204:
        setConfirmAppError('')
        setSuccess(true)
        break
      case 422:
        setConfirmAppError('Incorrect format')
        break
      case 400:
        setConfirmAppError(error)
        break
      default:
        setConfirmAppError(`Unknown error confirming code - ${error}`)
    }
  }, [qrCodeContent])
  useEffect(() => {
    if (qrCodeContent) {
      handleValueChange()
    }
  }, [qrCodeContent, handleValueChange])

  const ScanQR = () => {
    return (
      <>
        <SmallThinText>Complete the onboarding process</SmallThinText>
        <h2>Scan first QR code</h2>
        <QRReaderSection
          instructionText={`   You will find this in your email sent to you from the NICE Network.`}
          setQrCodeContent={setQrCodeContent}
        ></QRReaderSection>
        <ErrorText>{confirmAppError}</ErrorText>
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
      <ContentWrapper>{success ? <Success /> : <ScanQR />}</ContentWrapper>
    </WrapperWithHeader>
  )
}

export default CompleteOnboardingPage
