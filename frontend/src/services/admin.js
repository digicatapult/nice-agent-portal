const BASE_URL = 'https://your-backend-api-url.com'

export const getApprovedMemebers = async () => {
  // const response = await fetch(`${BASE_URL}/get-approved-members`, options)
  // const data = await response.json()
  const exampleData = [`XYZ Batteries Company`, `ABC Breaks Company`]
  return exampleData
}

export const getNotApprovedMemebers = async () => {
  // const response = await fetch(`${BASE_URL}/get-not-approved-members`, options)
  // const data = await response.json()
  const exampleData = [
    `Ethan's Exhaust Company`,
    `Sam's Batteries Company`,
    `Branson's Breaks Company`,
  ]
  return exampleData
}

export const getQRContentToOnboard = async (id) => {
  // const response = await fetch(`${BASE_URL}/get-qr-code-content/{id}`, options)
  // const data = await response.json()
  const exampleData = `some random data to put in QR for ${id}`
  return exampleData
}

export const approveMember = async (id) => {
  // const response = await fetch(
  //   `${BASE_URL}/admin/members/{id}/approve`,
  //   options
  // )
  const response = {}
  return response
}
