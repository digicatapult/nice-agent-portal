export const NewHomePage = () => {
  const handleButtonClick = (buttonName) => {
    // Use history.push to navigate to a different page
    window.location.href = `/${buttonName.toLowerCase()}`
  }
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    height: '100vh',
    fontFamily: 'Roboto, sans-serif',
  }
  const buttonStyle = {
    backgroundColor: '#FFFFFF', // Set background color to white
    border: '2px solid #000000', // Add a border for contrast
    borderRadius: '10px',
    color: '#333', // Set text color to a dark color for readability
    // padding: '20px 32px',
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
  return (
    <>
      <div style={containerStyle}>
        <p style={{ margin: '0px', fontWeight: 'bold' }}>Welcome to the</p>
        <h1 style={{ margin: '10px 0px 50px 0px' }}>NICE network</h1>

        {/* Sign Up */}
        <button
          style={buttonStyle}
          onClick={() => handleButtonClick('sign-up')}
        >
          <img
            src="images/sign_up.png" // Replace with the path to your image
            alt="Button Image Sign Up"
            style={{
              padding: '10px',
              verticalAlign: 'middle',

              display: 'block',
            }}
          />
          Sign Up
        </button>

        {/* Complete Onboarding */}
        <button
          style={buttonStyle}
          onClick={() => handleButtonClick('complete-onboarding')}
        >
          <img
            src="/images/complete_onboarding.png" // Replace with the path to your image
            alt="Button Complete Onboarding"
            style={{
              padding: '10px',
              verticalAlign: 'middle',

              display: 'block',
            }}
          />
          Complete Onboarding
        </button>

        {/* SSI Profile */}
        <button
          style={buttonStyle}
          onClick={() => handleButtonClick('ssi-profile')}
        >
          <img
            src="/images/ssi_profile.png" // Replace with the path to your image
            alt="Button SSI profile"
            style={{
              padding: '10px',
              verticalAlign: 'middle',
              display: 'block',
            }}
          />
          SSI Profile
        </button>
      </div>
    </>
  )
}
