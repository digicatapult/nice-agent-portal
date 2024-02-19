import React from 'react'
import { Button } from './shared'
import { useNavigate } from 'react-router-dom'

const ButtonWithImage = ({
  title,
  imagePath,
  buttonClick,
  optionalMargin = '0px',
  optionalImageHeight = 'auto',
}) => {
  const navigate = useNavigate()
  const handleButtonClick = (e, buttonClick) => {
    navigate(`/${buttonClick}`)
  }
  return (
    <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: optionalMargin,
      }}
      onClick={(e) => handleButtonClick(e, buttonClick)}
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
