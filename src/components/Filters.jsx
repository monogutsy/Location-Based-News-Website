function Filters({
  category,
  setCategory,
}) {
  const filters = [
    'All',
    'Nation',
    'Sports',
    'Events',
    'Crime',
    'More',
  ]

  return (
    <section className='filters'>
      {filters.map((item) => (
        <button
          key={item}
          className={
            category === item
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setCategory(item)
          }
        >
          {item}
        </button>
      ))}
    </section>
  )
}

export default Filters