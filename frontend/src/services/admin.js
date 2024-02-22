const BASE_URL = 'https://your-backend-api-url.com'

export const getApprovedMemebers = async () => {
  // const response = await fetch(`${BASE_URL}/get-approved-members`, options)
  // const data = await response.json()
  const exampleData = [
    `Ethan's Exhaust Company`,
    `Sam's Batteries Company`,
    `Branson's Breaks Company`,
  ]
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
