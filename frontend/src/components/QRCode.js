import React from 'react'
import { SmallThinText, QRReaderWrapper } from './shared'
import { QRReader } from '@digicatapult/ui-component-library'

const QRReaderSection = ({ instructionText, setQrCodeContent }) => {
  const handleQrCode = (qr) => {
    // eslint-disable-next-line
    console.log(`Scanned: ${qr}`)
    setQrCodeContent(qr)
  }
  return (
    <>
      <SmallThinText>{instructionText}</SmallThinText>
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
    </>
  )
}
export default QRReaderSection
