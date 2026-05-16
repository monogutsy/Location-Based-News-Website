function Pagination({
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className='pagination'>
      <button
        className='page-arrow'
        disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(
              currentPage - 1
            )
          }
        }}
      >
        ←
      </button>

      <div className='page-indicator'>
        <span className='current-page'>
          {currentPage}
        </span>
      </div>

      <button
        className='page-arrow'
        onClick={() =>
          setCurrentPage(
            currentPage + 1
          )
        }
      >
        →
      </button>
    </div>
  )
}

export default Pagination