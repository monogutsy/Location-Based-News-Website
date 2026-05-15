import axios from 'axios'

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export const searchLocation = async (name) => {
  try {
    const response = await axios.get(GEO_URL, {
      params: {
        name,
        count: 5,
        language: 'en',
        format: 'json',
      },
    })

    return response.data.results || []
  } catch (error) {
    console.error(error)
    return []
  }
}