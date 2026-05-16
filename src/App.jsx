import { useEffect, useState } from 'react'

import './index.css'

import { fetchNews } from './services/newsApi'
import { fetchWeather } from './services/weatherApi'

import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import HeroSection from './components/HeroSection'
import WeatherCard from './components/WeatherCard'
import TrendingCard from './components/TrendingCard'
import InteractiveMap from './components/InteractiveMap'
import Filters from './components/Filters'
import NewsGrid from './components/NewsGrid'
import Pagination from './components/Pagination'
import IncidentHeatmap from './components/IncidentHeatmap'

function App() {
  const [news, setNews] = useState([])
  const [weather, setWeather] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const [location, setLocation] =
    useState('Manila')

  const [category, setCategory] =
    useState('All')

  const [currentPage, setCurrentPage] =
    useState(1)

  const [
    showAllTrending,
    setShowAllTrending,
  ] = useState(false)

  const [
    selectedPlace,
    setSelectedPlace,
  ] = useState(null)

  const [mapNews, setMapNews] =
    useState([])

useEffect(() => {
  async function loadNews() {
    try {
      setLoading(true)

      const data = await fetchNews(
        location,
        currentPage
      )

      setNews(data)

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      )

      const geoData =
        await geoResponse.json()

      if (
        !geoData.results ||
        geoData.results.length === 0
      ) {
        return
      }

      const {
        latitude: lat,
        longitude: lon,
      } = geoData.results[0]

      const weatherData =
        await fetchWeather(lat, lon)

      setWeather(weatherData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  loadNews()
}, [location, currentPage])

  const filteredNews =
    Array.isArray(news)
      ? news.filter((item) => {
          const matchesSearch =
            search === '' ||
            item.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesCategory =
            category === 'All' ||
            (Array.isArray(
              item.category
            )
              ? item.category.some((cat) =>
                  cat
                    .toLowerCase()
                    .includes(
                      category.toLowerCase()
                    )
                )
              : item.category
                  ?.toLowerCase()
                  .includes(
                    category.toLowerCase()
                  ))

          return (
            matchesSearch &&
            matchesCategory
          )
        })
      : []

  const heroNews =
    filteredNews[0] || null

  const gridNews =
    filteredNews.length > 1
      ? filteredNews.slice(1)
      : filteredNews

  return (
    <div className='app'>
      <Sidebar />

      <main className='main-content'>
        <Topbar
          search={search}
          setSearch={setSearch}
          setLocation={setLocation}
          setCurrentPage={
            setCurrentPage
          }
          location={location}
        />

        <div className='hero-section'>
          <HeroSection
            heroNews={heroNews}
          />

          <div className='widgets'>
            <WeatherCard
              weather={weather}
              location={location}
            />

            <TrendingCard
              news={news}
              showAllTrending={
                showAllTrending
              }
              setShowAllTrending={
                setShowAllTrending
              }
            />
          </div>
        </div>

        <h2 className='section-title'>
          Latest News
        </h2>

        <InteractiveMap
          selectedPlace={
            selectedPlace
          }
          setSelectedPlace={
            setSelectedPlace
          }
          mapNews={mapNews}
          setMapNews={setMapNews}
          fetchNews={fetchNews}
        />

        <IncidentHeatmap
  news={news}
  location={location}
/>

        <Filters
          category={category}
          setCategory={setCategory}
        />

        <NewsGrid
          loading={loading}
          filteredNews={
            filteredNews
          }
          gridNews={gridNews}
        />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={
            setCurrentPage
          }
        />
      </main>
    </div>
  )
}

export default App