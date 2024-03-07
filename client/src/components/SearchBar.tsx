//designad för att låta användare skriva in och skicka in en sökterm,
//vilken sedan hanteras av en funktion som skickas in som en prop.
import React, { useState } from "react";

interface SearchBarProps {
  //typescript interface för att definiera vilka props som komponenten tar emot
  onSearch: (searchTerm: string) => void; // En callback-funktion för att skicka söktermen tillbaka till parent-komponenten
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); //state för att hålla reda på söktermen

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Förhindrar sidan från att ladda om
    onSearch(searchTerm); // Anropar callback-funktionen med söktermen
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
