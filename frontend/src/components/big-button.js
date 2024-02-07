import React from 'react'

const BigButton = ({ buttonClick, buttonName, imageSrc, altText }) => {
  const handleButtonClick = (buttonClick) => {
    window.location.href = `/${buttonClick.toLowerCase()}`
  }
  const buttonStyle = {
    backgroundColor: '#FFFFFF',
    border: '2px solid #000000',
    borderRadius: '10px',
    color: '#333',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '20px',
    margin: '4px 2px',
    padding: '5px',
    cursor: 'pointer',
    width: '50%',
  }
  const imageStyle = {
    padding: '10px',
    verticalAlign: 'middle',
    display: 'block',
  }
  return (
    <button
      style={buttonStyle}
      onClick={() => handleButtonClick(buttonClick)}
      onMouseOver={(e) => (e.target.style.borderColor = 'red')}
      onMouseOut={(e) => (e.target.style.borderColor = '#000000')}
    >
      <img src={imageSrc} alt={altText} style={imageStyle} />
      {buttonName}
    </button>
  )
}
export default BigButton
