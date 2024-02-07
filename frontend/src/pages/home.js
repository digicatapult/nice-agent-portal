import React from 'react'
const NewHomePage = () => {
  const handleButtonClick = (buttonName) => {
    window.location.href = `/${buttonName.toLowerCase()}`
  }
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Roboto, sans-serif',
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
    <>
      <div style={containerStyle}>
        <p style={{ margin: '0px', fontWeight: 'bold' }}>Welcome to the</p>
        <h1 style={{ margin: '10px 0px 50px 0px' }}>NICE Network</h1>

        {/* Sign Up */}
        <button
          style={buttonStyle}
          onClick={() => handleButtonClick('sign-up')}
          onMouseOver={(e) => (e.target.style.borderColor = 'red')}
          onMouseOut={(e) => (e.target.style.borderColor = '#000000')}
        >
          <img
            src="images/sign_up.png"
            alt="Button Image Sign Up"
            style={imageStyle}
          />
          Sign Up
        </button>

        {/* Complete Onboarding */}
        <button
          style={buttonStyle}
          onClick={() => handleButtonClick('complete-onboarding')}
          onMouseOver={(e) => (e.target.style.borderColor = 'red')}
          onMouseOut={(e) => (e.target.style.borderColor = '#000000')}
        >
          <img
            src="/images/complete_onboarding.png"
            alt="Button Complete Onboarding"
            style={imageStyle}
          />
          Complete Onboarding
        </button>

        {/* SSI Profile */}
        <button
          style={buttonStyle}
          onClick={() => handleButtonClick('ssi-profile')}
          onMouseOver={(e) => (e.target.style.borderColor = 'red')}
          onMouseOut={(e) => (e.target.style.borderColor = '#000000')}
        >
          <img
            src="/images/ssi_profile.png"
            alt="Button SSI profile"
            style={imageStyle}
          />
          SSI Profile
        </button>
      </div>
    </>
  )
}

export default NewHomePage
