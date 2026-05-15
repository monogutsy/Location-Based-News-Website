function Favorites({ favorites }) {
  return (
    <div>
      <h2>Favorite Locations</h2>

      {favorites.map((fav, index) => (
        <p key={index}>{fav}</p>
      ))}
    </div>
  )
}

export default Favorites