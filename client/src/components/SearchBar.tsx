import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; 
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Sök..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Sök</button>
    </form>
  );
};
