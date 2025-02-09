import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showFilters: boolean;
  handleSearch: () => void;
  handleFilteredSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleKeyPress,
  showFilters,
  handleSearch,
  handleFilteredSearch,
}) => {
  return (
    <div className="flex flex-grow justify-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pesquisar livros..."
          className="w-full px-4 py-2 pl-10 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button
          onClick={showFilters ? handleFilteredSearch : handleSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-full bg-blue-500 hover:bg-blue-600 text-white px-4"
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
};

export default SearchBar; 