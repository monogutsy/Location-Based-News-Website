function SearchBar({ location, setLocation }) {
  return (
    <div>
      <input
        type='text'
        placeholder='Enter location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  )
}

export default SearchBar