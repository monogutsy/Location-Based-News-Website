import {
  FaBell,
  FaMoon,
  FaSearch,
  FaChevronDown,
} from 'react-icons/fa'

function Topbar({
  search,
  setSearch,
  setLocation,
  setCurrentPage,
  location,
}) {
  return (
    <header className='topbar'>
      <div className='search-box'>
        <FaSearch />

        <input
          type='text'
          placeholder='Search city...'
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (
                search.trim() === ''
              ) {
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

          <span>Mono</span>
        </div>
      </div>
    </header>
  )
}

export default Topbar