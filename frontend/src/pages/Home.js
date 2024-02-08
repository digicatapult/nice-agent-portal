import React from 'react'
import styled from 'styled-components'
import BigButton from '../components/BigButton'
const NewHomePage = () => {
  const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Roboto, sans-serif;
  `

  const SmallText = styled.p`
    margin: 0px;
    font-weight: bold;
  `
  const HeadingText = styled.h1`
    margin: 10px 0px 50px 0px;
  `

  return (
    <>
      <ContainerStyle>
        <SmallText>Welcome to the</SmallText>
        <HeadingText>NICE Network</HeadingText>
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

        {/* SSI Profile  */}
        <BigButton
          buttonClick={'ssi-profile'}
          buttonName={'SSI Profile'}
          imageSrc={'/images/ssi_profile.png'}
          altText={'Button SSI profile'}
        />
      </ContainerStyle>
    </>
  )
}

export default NewHomePage
