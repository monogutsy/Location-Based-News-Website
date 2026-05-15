import NewsCard from './NewsCard'

function NewsList({ news }) {
  return (
    <div>
      <h2>Latest News</h2>

      {news.length === 0 ? (
        <p>No news found.</p>
      ) : (
        news.map((item, index) => (
          <NewsCard key={index} item={item} />
        ))
      )}
    </div>
  )
}

export default NewsList