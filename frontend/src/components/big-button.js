import React from 'react'
import styled from 'styled-components'

const BigButton = ({ buttonClick, buttonName, imageSrc, altText }) => {
  const handleButtonClick = (buttonClick) => {
    window.location.href = `/${buttonClick.toLowerCase()}`
  }
  const ButtonStyle = styled.button`
    background-color: #ffffff;
    border: 2px solid #000000;
    border-radius: 10px;
    color: #333;
    text-align: center;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    margin: 4px 2px;
    padding: 5px;
    cursor: pointer;
    width: 50%;
  `
  const ImageStyle = styled.img`
    padding: 10px;
    vertical-align: middle;
    display: block;
  `
  return (
    <ButtonStyle
      onClick={() => handleButtonClick(buttonClick)}
      onMouseOver={(e) => (e.target.style.borderColor = 'red')}
      onMouseOut={(e) => (e.target.style.borderColor = '#000000')}
    >
      <ImageStyle src={imageSrc} alt={altText} />
      {buttonName}
    </ButtonStyle>
  )
}
export default BigButton
