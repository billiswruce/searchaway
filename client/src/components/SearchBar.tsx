import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  correctedTerm?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  correctedTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState(correctedTerm || "");

  useEffect(() => {
    if (correctedTerm && correctedTerm !== searchTerm) {
      setSearchTerm(correctedTerm);
    }
  }, [correctedTerm, searchTerm]);

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
        placeholder="Your next favorite pic..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="placeholder"
      />
      <button type="submit">Search</button>
    </form>
  );
};
