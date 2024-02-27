// const BASE_URL = 'https://some-backend-api-url.com'

// eslint-disable-next-line no-unused-vars
export const postCreateConnection = async (did) => {
  // message body:
  // {
  //     did: string
  // }
  // const response = await fetch(`${BASE_URL}/connections`,message)
  // const data = await response.json()
  const exampleResponse = {
    status: 204,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
  }

  return exampleResponse
}
