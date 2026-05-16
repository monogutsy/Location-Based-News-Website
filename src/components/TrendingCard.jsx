function TrendingCard({
  news,
  showAllTrending,
  setShowAllTrending,
}) {
  return (
    <div className='trending-card'>
      <div className='trending-header'>
        <h3>Trending Now</h3>

        <button
          className='more-btn'
          onClick={() =>
            setShowAllTrending(
              !showAllTrending
            )
          }
        >
          {showAllTrending
            ? 'Less'
            : 'More'}
        </button>
      </div>

      <ul>
        {(showAllTrending
          ? news.slice(1, 10)
          : news.slice(1, 3)
        ).map((item, index) => (
          <li
            key={index}
            onClick={() =>
              window.open(
                item.url,
                '_blank'
              )
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
  )
}

export default TrendingCard