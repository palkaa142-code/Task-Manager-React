function SearchBar({ search, onSearchChange }) {
  return (
    <label className="field search-field">
      <span>Search events</span>
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by event name"
      />
    </label>
  );
}

export default SearchBar;
