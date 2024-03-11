import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchBar } from "./SearchBar";
import LoginButton from "../components/LoginButton";
import searchImages from "../models/SearchImages";
import axios from "axios";
import { FavPic } from "../models/FavPic";

export const SearchHomePage: React.FC<{ results: FavPic[] }> = ({}) => {
  const { user, isAuthenticated } = useAuth0();
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
      console.log("Search results:", results.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSpellingClick = () => {
    if (spelling) {
      handleSearch(spelling);
    }
  };

  const saveFavorites = async (image: {
    title: string;
    byteSize: number;
    link: string;
  }) => {
    if (!user || !user.email) return;

    try {
      const response = await axios.post("http://localhost:3000/users", {
        userId: user.sub,
        favorites: [
          {
            title: image.title,
            byteSize: image.byteSize,
            url: image.link,
          },
        ],
      });

      console.log("Favorite saved successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Error saving favorites:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleSave = async (image: {
    title: any;
    byteSize?: number;
    link: any;
    image?: any;
  }) => {
    if (!user || !user.email) return;

    try {
      const favoriteImage = {
        title: image.title,
        byteSize: image.image.byteSize,
        link: image.link,
      };

      const response = await axios.post("http://localhost:3000/users", {
        userId: user.sub,
        favorites: [favoriteImage],
      });

      console.log("Favorite saved successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Error saving favorites:",
        error.response ? error.response.data : error
      );
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
              Did you mean{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={handleSpellingClick}>
                {spelling}
              </span>
              ?
            </p>
          )}
          <div className="image-grid">
            {images.map(
              (
                image: { title: string; byteSize: number; link: string },
                index: number
              ) => (
                <div key={index}>
                  <img src={image.link} alt={image.title} />
                  <button onClick={() => handleSave(image)}>Favorite!</button>
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
