import React from 'react'
import { Button } from './shared'
import styled from 'styled-components'

const SendMessageButton = ({
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

export default SendMessageButton
