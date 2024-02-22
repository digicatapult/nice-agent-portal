class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async doSTH(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    const data = await response.json()
    return data
  }
}

const apiService = new ApiService('https://your-backend-api-url.com')

export default apiService
