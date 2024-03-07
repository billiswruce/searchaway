import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchBar } from "./SearchBar";
import LoginButton from "./LoginButton";
import searchImages from "../models/SearchImages";

export const SearchHomePage = () => {
  const { isAuthenticated } = useAuth0();
  const [images, setImages] = useState([]);
  const [searchTime, setSearchTime] = useState("");
  const [spelling, setSpelling] = useState("");

  const handleSearch = async (searchTerm: string) => {
    try {
      const results = await searchImages(searchTerm);
      setImages(results.items);
      setSearchTime(results.searchInformation.formattedSearchTime);
      if (results.spelling && results.spelling.correctedQuery) {
        setSpelling(results.spelling.correctedQuery);
      } else {
        setSpelling("");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSpellingClick = () => {
    if (spelling) {
      handleSearch(spelling);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAuthenticated ? (
        <>
          <h1>Search away!</h1>
          <SearchBar onSearch={handleSearch} />
          {searchTime && <p>The search took {searchTime} seconds</p>}
          {spelling && (
            <p>
              Menade du{" "}
              <button onClick={handleSpellingClick}>{spelling}</button>?
            </p>
          )}
          <div className="image-grid">
            {images.map(
              (image: { link: string; title: string }, index: number) => (
                <div key={index}>
                  <img src={image.link} alt={image.title} />
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Log in to search</h1>
          <LoginButton />
        </>
      )}
    </div>
  );
};
