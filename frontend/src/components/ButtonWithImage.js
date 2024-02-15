import React from 'react'
import { Button } from './shared'

const ButtonWithImage = ({ title, imagePath, optionalMargin = '0px' }) => {
  return (
    <Button
      type="submit"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: optionalMargin,
      }}
    >
      <img src={imagePath} style={{ marginRight: '3px' }}></img>
      {title}
    </Button>
  )
}
export default ButtonWithImage
