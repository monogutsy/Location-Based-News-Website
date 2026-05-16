const API_KEY =
  ''
  // api key = cb98627f848e4926805de4d7a8cd4046

export const fetchNews = async (
  location,
  page = 1
) => {
  try {
    const offset = (page - 1) * 10

    const response = await fetch(
      `https://api.worldnewsapi.com/search-news?text=${location}&language=en&number=10&offset=${offset}&api-key=${API_KEY}`
    )

    const data = await response.json()

    console.log(
      'WORLD NEWS API:',
      data
    )

    if (!data.news) {
      return []
    }

    return data.news
  } catch (error) {
    console.error(
      'World News API Error:',
      error
    )

    return []
  }
}