function SearchBar({ searchTerm, setSearchTerm}) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search veteran resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default SearchBar;