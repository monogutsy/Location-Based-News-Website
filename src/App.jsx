import { useEffect, useState } from 'react'
import { fetchNews } from './services/newsApi'
import { fetchWeather } from './services/weatherApi'
import './index.css'
import nationIcon from './assets/icons/nation.png'
import sportsIcon from './assets/icons/sports.png'
import eventsIcon from './assets/icons/events.png'
import crimeIcon from './assets/icons/crime.png'
import educationIcon from './assets/icons/education.png'
import communityIcon from './assets/icons/community.png'
import {
  FaHome,
  FaFire,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaBookmark,
  FaHeart,
  FaPlayCircle,
  FaBell,
  FaMoon,
  FaSearch,
  FaChevronDown,
} from 'react-icons/fa'


function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const [showAllTrending, setShowAllTrending] = useState(false)
  const [news, setNews] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('Manila')
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    loadNews()
  }, [location, currentPage])

const loadNews = async () => {
  try {
    setLoading(true)

  const data = await fetchNews(
    location,
    currentPage
  )

    setNews(Array.isArray(data) ? data : [])

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

    const lat =
      geoData.results[0].latitude

    const lon =
      geoData.results[0].longitude

    const weatherData =
      await fetchWeather(lat, lon)

    setWeather(weatherData)
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

const filteredNews = news.filter((item) => {
  const matchesSearch =
    search === '' ||
    item.title
      ?.toLowerCase()
      .includes(search.toLowerCase())

  const matchesCategory =
    category === 'All' ||
    item.category?.some((cat) =>
      cat
        .toLowerCase()
        .includes(category.toLowerCase())
    )

  return matchesSearch && matchesCategory
})

const heroNews =
  filteredNews.length > 0
    ? filteredNews[0]
    : null

const gridNews =
  filteredNews.length > 1
    ? filteredNews.slice(1)
    : filteredNews


  return (
    <div className='app'>
      <aside className='sidebar'>
        <h2 className='logo'>NewsHub</h2>

        <nav>
          <a className='active'>
            <FaHome /> Home
          </a>

          <a>
            <FaFire /> Trending
          </a>
                    <a>
            <FaMapMarkerAlt /> Map & Incidents
          </a>

          <a>
            <FaLayerGroup /> Categories
          </a>

          <a>
            <FaBookmark /> Favorites
          </a>

          <a>
            <FaHeart /> Saved Locations
          </a>

          <a>
            <FaPlayCircle /> Multimedia
          </a>
        </nav>

        <div className='sidebar-categories'>
          <h4>Categories</h4>

<div className='category-item'>
  <div className='category-circle'>
    <img
      src={nationIcon}
      alt='nation'
      className='category-icon'
    />
  </div>

  <span>Nation</span>
</div>

          <div className='category-item'>
            <div className='category-circle'>
              <img
                src={sportsIcon}
                alt='sports'
                className='category-icon'
              />
            </div>

            <span>Sports</span>
          </div>

          <div className='category-item'>
            <div className='category-circle'>
              <img
                src={eventsIcon}
                alt='events'
                className='category-icon'
              />
            </div>

            <span>Events</span>
          </div>

          <div className='category-item'>
            <div className='category-circle'>
              <img
                src={crimeIcon}
                alt='crime'
                className='category-icon'
              />
            </div>

            <span>Crime</span>
          </div>

          <div className='category-item'>
            <div className='category-circle'>
              <img
                src={educationIcon}
                alt='education'
                className='category-icon'
              />
            </div>

            <span>Education</span>
          </div>

          <div className='category-item'>
            <div className='category-circle'>
              <img
                src={communityIcon}
                alt='community'
                className='category-icon'
              />
            </div>

            <span>Community</span>
          </div>
        </div>
      </aside>

      <main className='main-content'>
        <header className='topbar'>
          <div className='search-box'>
            <FaSearch />
            <input type='text'
            placeholder='Search city...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {

                if (search.trim() === '') {
                  return
                }

                setCurrentPage(1)

                setLocation(search)
                setSearch('')
              }
            }}
/>
          </div>

          <div className='topbar-right'>
            <button className='location-btn'>
              <span className='location-text'>
                {location}
              </span>

              <FaChevronDown className='location-arrow' />
              
            </button>

            <button className='icon-btn'>
              <FaMoon />
            </button>

            <button className='icon-btn'>
              <FaBell />
            </button>

            <div className='profile'>
              <img
                src='https://i.pravatar.cc/100'
                alt='profile'
              />
              <span>Barney</span>
            </div>
          </div>

        </header>

        <div className='hero-section'>

          <div
            className='hero-card'
            onClick={() =>
              heroNews?.link &&
              window.open(heroNews.link, '_blank')
            }
            style={{
              cursor: 'pointer',
              backgroundImage: `url(${
                heroNews?.image_url ||
                'https://via.placeholder.com/1200x600'
              })`,
            }}
          >
            <div className='overlay'>
              <span className='badge'>RECENT</span>

              <h1>
                {heroNews?.title ||
                  'No headline available'}
              </h1>

              <p>
                {heroNews?.source_name ||
                  'Unknown Source'}
                {' | '}
                {heroNews?.category?.[0] ||
                  'News'}
              </p>
            </div>
          </div>

          <div className='widgets'>
            <div className='weather-card'>
              <h3>{location}</h3>

              <h1>
                {weather
                  ? `${Math.round(
                      weather.temperature
                    )}°`
                  : '--'}
              </h1>

              <p>
                {weather
                  ? weather.weathercode === 0
                    ? 'Clear Sky'
                    : 'Cloudy'
                  : 'Loading...'}
              </p>

              <span>
                {new Date().toLocaleDateString()} |{' '}
                {new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className='trending-card'>
              <div className='trending-header'>
                <h3>Trending Now</h3>

                <button className='more-btn' onClick={() =>setShowAllTrending(!showAllTrending)

                }
>
  {showAllTrending ? 'Less' : 'More'}
</button>
              </div>

              <ul>
                {(showAllTrending ? news.slice(1, 10): news.slice(1, 3)).map((item, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      window.open(item.link, '_blank')
                    }
                  >
                    <span className='trend-number'>
                      {index + 1}
                    </span>

                    <p>{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h2 className='section-title'>
          Latest News
        </h2>

        <section className='filters'>
          <button className={
            category === 'All' ? 'active-filter': ''
    }
    onClick={() => setCategory('All')}
    >
      All
      </button>

        <button
          className={
            category === 'Nation'
              ? 'active-filter'
              : ''
          }
          onClick={() => setCategory('Nation')}
        >
          Nation
        </button>

        <button
          className={
            category === 'Sports'
              ? 'active-filter'
              : ''
          }
          onClick={() => setCategory('Sports')}
        >
          Sports
        </button>

        <button
          className={
            category === 'Events'
              ? 'active-filter'
              : ''
          }
          onClick={() => setCategory('Events')}
        >
          Events
        </button>

        <button
          className={
            category === 'Crime'
              ? 'active-filter'
              : ''
          }
          onClick={() => setCategory('Crime')}
        >
          Crime
        </button>

        <button
          className={
            category === 'More'
              ? 'active-filter'
              : ''
          }
          onClick={() => setCategory('More')}
        >
          More
        </button>
      </section>

        <section className='news-grid'>
          {loading ? (
            <h2>Loading news...</h2>
          ) : filteredNews.length === 0 ? (
          <h2>No news available.</h2>
        ) : (

            gridNews.map((item, index) => (
            <div
            className='news-card'
            key={index}
            onClick={() =>
              window.open(item.link, '_blank')
            }
            style={{ cursor: 'pointer' }}
>
              <img
              src={
                item.image_url ||
                'https://via.placeholder.com/400x300'}
                alt={item.title}
                />

        <div className='news-content'>
          <span className='news-tag'>
            {item.category?.[0] || 'News'}
          </span>

          <h3>{item.title}</h3>

          <div className='news-footer'>
            <span>
              {

                item.pubDate
                  ? new Date(item.pubDate).toLocaleDateString()
                  : 'Latest News'
}
            </span>

            <FaBookmark />
          </div>
        </div>
      </div>
    ))
  )}
</section>

<div className='pagination'>
  <button
    className='page-arrow'
    disabled={currentPage === 1}
    onClick={() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }}
  >
    ←
  </button>

  <div className='page-indicator'>
    <span className='current-page'>
      {currentPage}
    </span>
  </div>

  <button
    className='page-arrow'
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    →
  </button>
</div>

      </main>
    </div>
  )
}

export default App