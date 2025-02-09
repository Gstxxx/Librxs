import React from "react";

interface FilterBarProps {
  searchType: string;
  setSearchType: (type: string) => void;
  filterQuery: string;
  setFilterQuery: (query: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchType,
  setSearchType,
  filterQuery,
  setFilterQuery,
  handleKeyPress,
}) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="searchType"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Pesquisa
            </label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="default">Padrão</option>
              <option value="title">Título</option>
              <option value="author">Autor</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filterQuery"
              className="block text-sm font-medium text-gray-700"
            >
              Filtros (ex: Year=2010&Extension=epub)
            </label>
            <input
              type="text"
              id="filterQuery"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Year=2010&Extension=epub"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 