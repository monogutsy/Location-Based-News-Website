export const fetchWeather = async (
  lat,
  lon
) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    )

    const data = await response.json()

    return data.current_weather
  } catch (error) {
    console.error(
      'Weather API Error:',
      error
    )

    return null
  }
}