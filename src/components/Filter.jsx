import { categories } from "../eventUtils.js";

function Filter({ category, onCategoryChange }) {
  return (
    <label className="field filter-field">
      <span>Category</span>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All categories</option>
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Filter;
