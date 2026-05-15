function CategoryFilter({ category, setCategory }) {
  return (
    <div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value='general'>General</option>
        <option value='business'>Business</option>
        <option value='sports'>Sports</option>
        <option value='politics'>Politics</option>
        <option value='technology'>Technology</option>
      </select>
    </div>
  )
}

export default CategoryFilter