import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search = ({ setSearchMovie }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search button click
  const handleSearch = () => {
    setSearchMovie(searchTerm);
    setSearchTerm("");
  };
  //    Function to handle key down events in the search input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchMovie(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <div className="relative">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search movies..."
          className="py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* Search icon */}
        <MagnifyingGlassIcon
          className="h-6 w-6 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;
