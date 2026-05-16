import NewsCard from './NewsCard'

function NewsGrid({
  loading,
  filteredNews,
  gridNews,
}) {
  return (
    <section className='news-grid'>
      {loading ? (
        <h2>Loading news...</h2>
      ) : filteredNews.length === 0 ? (
        <h2>No news available.</h2>
      ) : (
        gridNews.map((item, index) => (
          <NewsCard
            key={index}
            item={item}
          />
        ))
      )}
    </section>
  )
}

export default NewsGrid