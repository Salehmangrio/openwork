import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const SearchPanel = ({ onSearch, onFilterChange, onReset }) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleReset = () => {
    setSearchText("");
    setCategory("");
    setSortBy("");
    onReset && onReset();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Filter className="text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Search & Filters</h2>
      </div>

      {/* Search + Category + Sort */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Search Bar */}
        <div className="col-span-2 flex items-center gap-2 bg-gray-50 rounded-lg px-3 border border-gray-300">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by title, category..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent py-2 outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            onFilterChange && onFilterChange("category", e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
        >
          <option value="">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
          <option value="Fullstack">Fullstack</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            onFilterChange && onFilterChange("sort", e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
        >
          <option value="">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-5 gap-4">
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center gap-1"
        >
          <X size={16} /> Reset
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
