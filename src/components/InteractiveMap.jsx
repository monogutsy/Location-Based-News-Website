import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'

function MapClickHandler({
  setSelectedPlace,
  setMapNews,
  fetchNews,
}) {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat
      const lon = e.latlng.lng

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      )

      const data =
        await response.json()

      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.municipality ||
        data.address?.village ||
        data.address?.state ||
        'Unknown Location'

      setSelectedPlace(city)

      const nearbyNews =
        await fetchNews(city)

      setMapNews(nearbyNews)
    },
  })

  return null
}

function InteractiveMap({
  selectedPlace,
  setSelectedPlace,
  mapNews,
  setMapNews,
  fetchNews,
}) {
  return (
    <section className='interactive-map-section'>
      <div className='map-header'>
        <h2>
          Interactive News Map
        </h2>

        <p>
          Click anywhere on the map
          to explore local news
        </p>
      </div>

      <div className='map-wrapper'>
        <MapContainer
          center={[13.9411, 121.6187]}
          zoom={12}
          scrollWheelZoom={true}
          wheelPxPerZoomLevel={120}
          style={{
            height: '500px',
            width: '100%',
          }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          <MapClickHandler
            setSelectedPlace={
              setSelectedPlace
            }
            setMapNews={setMapNews}
            fetchNews={fetchNews}
          />

          {selectedPlace && (
            <Marker
              position={[
                13.9411,
                121.6187,
              ]}
            >
              <Popup>
                {selectedPlace}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {mapNews.length > 0 && (
        <section className='map-news-section'>
          <h2>
            News Around{' '}
            {selectedPlace}
          </h2>

          <div className='news-grid'>
            {mapNews
              .slice(0, 6)
              .map((item, index) => (
                <div
                  className='news-card'
                  key={index}
                  onClick={() =>
                    window.open(
                      item.link,
                      '_blank'
                    )
                  }
                >
                  <img
                    src={
                      item.image_url ||
                      'https://via.placeholder.com/400x300'
                    }
                    alt={item.title}
                  />

                  <div className='news-content'>
                    <span className='news-tag'>
                      {item
                        .category?.[0] ||
                        'News'}
                    </span>

                    <h3>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default InteractiveMap