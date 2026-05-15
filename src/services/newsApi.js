const API_KEY =
  'pub_a84caf407db14c04baef56128adebf56'

export const fetchNews = async (
  location,
  page = 1
) => {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${location}&language=en&page=${page}`
    )

    const data = await response.json()

    console.log('API RESPONSE:', data)

    if (!data.results) {
      return []
    }

    return data.results
  } catch (error) {
    console.error(
      'News API Error:',
      error
    )

    return []
  }
}