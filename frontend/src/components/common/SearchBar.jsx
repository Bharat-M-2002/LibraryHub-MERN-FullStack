import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search books..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Filters (Optional) */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          All Categories
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Fiction
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Non-Fiction
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Science
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Technology
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
