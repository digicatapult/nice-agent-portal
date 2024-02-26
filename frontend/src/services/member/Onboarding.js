// const BASE_URL = 'https://some-backend-api-url.com'

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
//responds with OK  204

export const postConfirmApplication = async ({ verificationCode }) => {
  // const response = await fetch(`${BASE_URL}/api/confirmation`, options)
  // const data = await response.json()
  const exampleData = `some random data to put in QR for `
  return exampleData
}
