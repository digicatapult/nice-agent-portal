import React, { useState } from 'react'
import { QRReader } from '@digicatapult/ui-component-library'

import {
  SmallThinText,
  Button,
  QRReaderWrapper,
  ContentWrapper,
} from '../../components/shared'
import WrapperWithHeader from '../../components/Header'

const ScanTheirNiceId = () => {
  const [hasScanned, setHasScanned] = useState(false)

  const handleQrCode = (qr) => {
    // eslint-disable-next-line
    console.log(`Scanned: ${qr}`)
    setHasScanned(true)
  }

  const handleBackToProfile = () => {
    window.location.href = `/ssi-profile`
  }

  const ScanQR = () => {
    return (
      <>
        <h2>Add Company to your NICE Network</h2>
        <SmallThinText>
          If their company is already on NICE network, simply scan their NICE ID
          QR Code to add them as a NICE connection.
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
