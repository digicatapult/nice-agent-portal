const BASE_URL = '/api'

export const postSubmitApplication = async ({
  companyName,
  companiesHouseNumber,
  email,
  did,
  privateKey,
}) => {
  return fetch(`${BASE_URL}/application`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyName,
      companiesHouseNumber,
      email,
      did,
      privateKey,
    }),
  })
}

export const postConfirmApplication = async (verificationCode) => {
  return fetch(`${BASE_URL}/confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ verificationCode }),
  })
}
