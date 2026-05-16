function HeroSection({
  heroNews,
}) {
  return (
    <div
      className='hero-card'
      onClick={() =>
        heroNews?.link &&
        window.open(
          heroNews.link,
          '_blank'
        )
      }
      style={{
        cursor: 'pointer',
        backgroundImage: `url(${
          heroNews?.image ||
          'https://via.placeholder.com/1200x600'
        })`,
      }}
    >
      <div className='overlay'>
        <span className='badge'>
          RECENT
        </span>

        <h1>
          {heroNews?.title ||
            'No headline available'}
        </h1>

        <p>
          {heroNews?.source_country ||
            'Unknown Source'}
          {' | '}
          {heroNews?.category?.[0] ||
            'News'}
        </p>
      </div>
    </div>
  )
}

export default HeroSection