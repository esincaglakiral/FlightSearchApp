// src/pages/Search.jsx
import React from "react";
import SearchForm from "../components/SearchForm";

const Search = () => {
  const handleSearch = (values) => {
    // Burada form değerlerini kullanarak API isteği yapabilirsiniz
    console.log("Search form submitted with values:", values);
  };

  return (
    <div>
      <h2>Flight Search Page</h2>
      <p>This is the flight search page content.</p>

      {/* SearchForm'u entegre et */}
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default Search;
