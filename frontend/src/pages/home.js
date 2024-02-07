import React from 'react'
import BigButton from '../components/big-button'
const NewHomePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Roboto, sans-serif',
  }

  return (
    <>
      <div style={containerStyle}>
        <p style={{ margin: '0px', fontWeight: 'bold' }}>Welcome to the</p>
        <h1 style={{ margin: '10px 0px 50px 0px' }}>NICE Network</h1>
        {/* Sign Up */}
        <BigButton
          buttonClick={'sign-up'}
          buttonName={'Sign Up'}
          imageSrc={'images/sign_up.png'}
          altText={'Button Image Sign Up'}
        />
        {/* Complete Onboarding */}
        <BigButton
          buttonClick={'complete-onboarding'}
          buttonName={'Complete Onboarding'}
          imageSrc={'/images/complete_onboarding.png'}
          altText={'Button Complete Onboarding'}
        />

        {/* SSI Profile */}
        <BigButton
          buttonClick={'ssi-profile'}
          buttonName={'SSI Profile'}
          imageSrc={'/images/ssi_profile.png'}
          altText={'Button SSI profile'}
        />
      </div>
    </>
  )
}

export default NewHomePage
