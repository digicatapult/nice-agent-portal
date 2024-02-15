import React from 'react'
import { Button } from './shared'

const ButtonWithImage = ({
  title,
  imagePath,
  buttonClick,
  optionalMargin = '0px',
  optionalImageHeight = 'auto',
}) => {
  const handleButtonClick = (buttonClick) => {
    window.location.href = `/${buttonClick}`
  }
  return (
    <Button
      // type="submit"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: optionalMargin,
      }}
      onClick={() => handleButtonClick(buttonClick)}
    >
      <img
        src={imagePath}
        style={{ marginRight: '5px', height: optionalImageHeight }}
      ></img>
      {title}
    </Button>
  )
}
export default ButtonWithImage
