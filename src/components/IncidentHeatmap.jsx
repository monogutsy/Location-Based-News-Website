import {
  MapContainer,
  TileLayer,
  CircleMarker,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'



function IncidentHeatmap({
  news,
  location,
}) {
  const incidents = news
    .slice(0, 6)
    .map((item, index) => {
      let type = 'General'
      let color = '#3b82f6'

      const title =
        item.title?.toLowerCase() ||
        ''

      if (
        title.includes('fire')
      ) {
        type = 'Fire'
        color = '#84cc16'
      } else if (
        title.includes('crime') ||
        title.includes('arrest') ||
        title.includes('police')
      ) {
        type = 'Crime'
        color = '#ef4444'
      } else if (
        title.includes('health') ||
        title.includes('hospital')
      ) {
        type = 'Health'
        color = '#22c55e'
      } else if (
        title.includes('traffic') ||
        title.includes('road') ||
        title.includes('vehicle')
      ) {
        type = 'Traffic'
        color = '#f97316'
      }

      return {
        id: index,
        type,
        color,
        title: item.title,
        date:
          item.publish_date ||
          'Latest News',
        position: [
          13.9411 +
            Math.random() * 0.03,
          121.6187 +
            Math.random() * 0.03,
        ],
      }
    })

  return (
    <section className='heatmap-section'>
      <div className='heatmap-header'>
        <h2>
          Incident Heatmap
        </h2>

        <p>
          View incident density in
          different areas.
        </p>
      </div>

      <div className='heatmap-wrapper'>
        <MapContainer
          center={[13.9411, 121.6187]}
          zoom={13}
          scrollWheelZoom={true}
          style={{
            height: '450px',
            width: '100%',
          }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {incidents.map(
            (incident) => (
              <CircleMarker
                key={incident.id}
                center={
                  incident.position
                }
                radius={35}
                pathOptions={{
                  fillColor:
                    incident.color,
                  color:
                    incident.color,
                  fillOpacity: 0.35,
                  weight: 0,
                }}
              />
            )
          )}
        </MapContainer>

        <div className='incident-panel'>
          <h4>
            Recent Incidents in{' '}
            {location}
          </h4>

          <div className='incident-list'>
            {incidents.map(
              (incident) => (
                <div
                  className='incident-card'
                  key={incident.id}
                >
                  <div className='incident-top'>
                    <div
                      className='incident-badge'
                      style={{
                        background:
                          incident.color,
                      }}
                    >
                      {incident.type}
                    </div>
                  </div>

                  <div className='incident-location'>
                    {incident.title}
                  </div>

                  <div className='incident-date'>
                    {new Date(
                      incident.date
                    ).toLocaleDateString()}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IncidentHeatmap