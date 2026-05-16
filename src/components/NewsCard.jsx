import { FaBookmark } from 'react-icons/fa'

function NewsCard({ item }) {
  return (
    <div
      className='news-card'
      onClick={() =>
        window.open(item.url, '_blank')
      }
      style={{ cursor: 'pointer' }}
    >
      <img
        src={
          item.image ||
          'https://via.placeholder.com/400x300'
        }
        alt={item.title}
      />

      <div className='news-content'>
        <span className='news-tag'>
          {item.category?.[0] || 'News'}
        </span>

        <h3>{item.title}</h3>

        <div className='news-footer'>
          <span>
            {item.publish_date
              ? new Date(
                  item.pubDate
                ).toLocaleDateString()
              : 'Latest News'}
          </span>

          <FaBookmark />
        </div>
      </div>
    </div>
  )
}

export default NewsCard