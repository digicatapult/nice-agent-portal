import React from 'react'
import { Button } from './shared'
import { approveMember, getQRContentToOnboard } from '../services/admin'

export const SendMessageButton = ({
  title,
  setIsOpen,
  isOpen,
  dialogRef,
  imagePath,
  optionalMargin = '0px',
  optionalImageHeight = 'auto',
}) => {
  const handleOnClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      dialogRef.current?.show()
    } else {
      dialogRef.current?.close()
    }
  }
  return (
    <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: optionalMargin,
      }}
      onClick={handleOnClick}
    >
      <img
        src={imagePath}
        style={{
          height: optionalImageHeight,
        }}
      ></img>
      {title}
    </Button>
  )
}

export const RoundButton = ({
  setIsOpen,
  isOpen,
  dialogRef,
  imagePath,
  optionalMargin = '0px',
  optionalImageHeight = 'auto',
  setQRContent,
  contentKey,
}) => {
  const handleOnClick = async () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      dialogRef.current?.show()
    } else {
      dialogRef.current?.close()
    }

    const qrContent = await getQRContentToOnboard(contentKey)

    setQRContent(qrContent)
    await approveMember(contentKey) //approves member
  }
  return (
    <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: optionalMargin,
        padding: '0px',
        border: 'none',
        boxShadow: 'none',
      }}
      onClick={handleOnClick}
    >
      <img
        src={imagePath}
        style={{
          height: optionalImageHeight,
        }}
      ></img>
    </Button>
  )
}
