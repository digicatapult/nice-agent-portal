// const BASE_URL = 'https://your-backend-api-url.com'

export const getMemebers = async () => {
  // const response = await fetch(`${BASE_URL}/admin/members`, options)
  // const data = await response.json()
  const exampleData = [
    {
      id: 123456,
      companyName: `Ethan's Exhaust Company`,
      companiesHouseNumber: `XYZ234`,
      email: `email@email.com`,
      status: `pending`,
      did: `123455690789`,
      verificationCode: `someverificationCodeFORETHAN`,
    },
    {
      id: 123456,
      companyName: `Sam's Batteries Company`,
      companiesHouseNumber: `XYZ234`,
      email: `email@email.com`,
      status: `pending`,
      did: `123455690789`,
      verificationCode: `someverificationCodeFORSAM`,
    },
    {
      id: 123456,
      companyName: `Branson's Breaks Company`,
      companiesHouseNumber: `XYZ234`,
      email: `email@email.com`,
      status: `pending`,
      did: `123455690789`,
      verificationCode: `someverificationCodeFORBRANSON`,
    },
    {
      id: 123456,
      companyName: `Kevin's Company`,
      companiesHouseNumber: `XYZ234`,
      email: `email@email.com`,
      status: `approved`,
      did: `123455690789`,
      verificationCode: `someverificationCodeFORKevin`,
    },
    {
      id: 123456,
      companyName: `Eva's Company`,
      companiesHouseNumber: `XYZ234`,
      email: `email@email.com`,
      status: `approved`,
      did: `123455690789`,
      verificationCode: `someverificationCodeFOREva`,
    },
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
  const response = { id }
  return response
}
