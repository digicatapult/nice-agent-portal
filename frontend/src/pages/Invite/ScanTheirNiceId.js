import React, { useState, useCallback, useEffect } from 'react'

import { SmallThinText, Button, ContentWrapper } from '../../components/shared'
import WrapperWithHeader from '../../components/Header'
import QRReaderSection from '../../components/QRCode'
import { postCreateConnection } from '../../services/member/Connection'

const ScanTheirNiceId = () => {
  const [hasScanned, setHasScanned] = useState(false)
  const [QrCodeContent, setQRCodeContent] = useState('')

  const handleBackToProfile = () => {
    window.location.href = `/ssi-profile`
  }
  const handleValueChange = useCallback(async () => {
    try {
      const response = await postCreateConnection(QrCodeContent) //we assume the qr code contains a did

      if (response.status != 204) {
        throw new Error(`Status code: ${response.status}`)
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }, [QrCodeContent])
  useEffect(() => {
    if (QrCodeContent) {
      handleValueChange()
    }
  }, [QrCodeContent, handleValueChange])

  const ScanQR = () => {
    return (
      <>
        <h2>Add Company to your NICE Network</h2>
        <QRReaderSection
          instructionText={`If their company is already on NICE network, simply scan their NICE ID
          QR Code to add them as a NICE connection.`}
          setHasScanned={setHasScanned}
          setQRCodeContent={setQRCodeContent}
        ></QRReaderSection>
        <Button onClick={handleBackToProfile}>{'<'}</Button>
      </>
    )
  }

  const Success = () => {
    return (
      <>
        <h2>Congratulations!</h2>
        <SmallThinText>
          You have successfully added Ethan as a Connected Compnay on NICE.
        </SmallThinText>
        <Button onClick={handleBackToProfile}>Back to Profile</Button>
      </>
    )
  }

  return (
    <WrapperWithHeader>
      <ContentWrapper>{hasScanned ? <Success /> : <ScanQR />}</ContentWrapper>
    </WrapperWithHeader>
  )
}

export default ScanTheirNiceId
