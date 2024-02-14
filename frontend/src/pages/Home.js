import React from 'react'
import BigButton from '../components/BigButton'
import { ContainerStyle, SmallText, HeadingText } from '../components/shared'
const NewHomePage = () => {
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
