function NewsCard({ item }) {
  return (
    <div>
      <h3>{item.title}</h3>

      <p>
        {item.text?.slice(0, 150)}...
      </p>

      <a
        href={item.url}
        target='_blank'
        rel='noreferrer'
      >
        Read More
      </a>

      <hr />
    </div>
  )
}

export default NewsCard