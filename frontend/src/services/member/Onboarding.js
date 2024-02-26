// const BASE_URL = 'https://some-backend-api-url.com'

// eslint-disable-next-line no-unused-vars
export const postSubmitApplication = async (data) => {
  // const response = await fetch(`${BASE_URL}/api/application`,data)
  // const data = await response.json()
  const exampleResponse = {
    status: 204,
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Custom Value',
    },
    data: {},
  }

  return exampleResponse
}

// eslint-disable-next-line
export const postConfirmApplication = async (verificationCode) => {
  // const response = await fetch(`${BASE_URL}/api/confirmation`, options)
  // const data = await response.json()
  const exampleResponse = {
    status: 204,
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Custom Value',
    },
    data: {},
  }
  return exampleResponse
}
