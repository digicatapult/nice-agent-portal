import React from 'react'
import { Button } from './shared'

const ButtonWithImage = ({
  title,
  imagePath,
  optionalMargin = '0px',
  optionalImageHeight = 'auto',
}) => {
  return (
    <Button
      type="submit"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: optionalMargin,
      }}
    >
      <img
        src={imagePath}
        style={{ marginRight: '3px', height: optionalImageHeight }}
      ></img>
      {title}
    </Button>
  )
}
export default ButtonWithImage
