import axios from 'axios'

const REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse'

export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(REVERSE_URL, {
      params: {
        lat,
        lon,
        format: 'json',
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}