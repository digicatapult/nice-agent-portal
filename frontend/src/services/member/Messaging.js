// const BASE_URL = 'https://some-backend-api-url.com'

// eslint-disable-next-line no-unused-vars
export const postSendMessage = async (message) => {
  // message body:
  // {
  //     content: string
  //     recipientDid: string
  // }
  // const response = await fetch(`${BASE_URL}/api/send-message`,message)
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

// eslint-disable-next-line no-unused-vars
export const getMessages = async () => {
  // const response = await fetch(`${BASE_URL}/api/messages`)
  // const data = await response.json()
  const exampleResponse = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Custom Value',
    },
    data: { messages: ['Message 1', 'Message 2'] },
  }

  return exampleResponse
}
