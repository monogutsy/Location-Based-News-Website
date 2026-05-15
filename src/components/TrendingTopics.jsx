function TrendingTopics({ news }) {
  const titles = news.slice(0, 5)

  return (
    <div>
      <h2>Trending Topics</h2>

      {titles.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}
    </div>
  )
}

export default TrendingTopics