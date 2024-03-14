import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchBar } from "./SearchBar";
import LoginButton from "../components/LoginButton";
import searchImages from "../models/SearchImages";
import axios from "axios";
import { FavPic } from "../models/FavPic";
import heart1 from "../img/heart1.svg";
import heart2 from "../img/heart2.svg";
import icon from "../img/icon.png";

export const SearchHomePage: React.FC<{ results: FavPic[] }> = ({}) => {
  const { user, isAuthenticated } = useAuth0();
  const [images, setImages] = useState<
    {
      link: string;
      title: string;
      image: {
        byteSize: number;
        // contextLink: string;
        // height: number;
        // thumbnailHeight: number;
        // thumbnailLink: string;
        // thumbnailWidth: number;
        // width: number;
      };
    }[]
  >([]);
  const [searchTime, setSearchTime] = useState("");
  const [spelling, setSpelling] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const isFavorite = (imageLink: string) => favorites.has(imageLink);

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
      console.log("Client/Search results:", results.items);
    } catch (error) {
      console.error("Client/Fetch error:", error);
    }
  };

  const handleSpellingClick = () => {
    if (spelling) {
      handleSearch(spelling);
    }
  };

  //definierar en asynkron funktion som sparar favoriter
  const saveFavorites = async (image: {
    title: string;
    byteSize: number;
    link: string;
    image: {
      byteSize: number;
      // contextLink: string;
      // height: number;
      // thumbnailHeight: number;
      // thumbnailLink: string;
      // thumbnailWidth: number;
      // width: number;
    };
  }) => {
    if (!user || !user.sub) return; //avbryter om användaren inte är inloggad

    const updatedFavorites = new Set(favorites); //skapar en kopia av favorites
    updatedFavorites.add(image.link); //lägger till bilden i kopian
    setFavorites(updatedFavorites); //uppdaterar favorites med kopian

    try {
      const favoriteObject = {
        //skapar ett objekt med bilden som ska sparas
        title: image.title,
        byteSize: image.image.byteSize,
        link: image.link,
      };
      //använder axios för att skicka en POST-förfrågan till servern
      const response = await axios.post("http://localhost:3000/users", {
        userId: user.sub,
        favorites: [favoriteObject],
      });

      console.log("Client/Favorite saved successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Client/Error saving favorites:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAuthenticated ? (
        <>
          <img src={icon} alt="chatbubble" className="chatBubble"></img>
          {spelling && (
            <p>
              Did you mean{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "#53a064",
                  textDecoration: "underline",
                }}
                onClick={handleSpellingClick}>
                {spelling}
              </span>
              ?
            </p>
          )}
          <SearchBar onSearch={handleSearch} />

          <div className="image-grid">
            {images.map(
              (
                image: {
                  link: string;
                  title: string;
                  image: { byteSize: number };
                },
                index: number
              ) => (
                <div key={index} className="image-container">
                  <img src={image.link} alt={image.title} className="image" />
                  <button
                    onClick={() =>
                      saveFavorites(
                        image as {
                          title: string;
                          byteSize: number;
                          link: string;
                          image: {
                            byteSize: number;
                            // contextLink: string;
                            // height: number;
                            // thumbnailHeight: number;
                            // thumbnailLink: string;
                            // thumbnailWidth: number;
                            // width: number;
                          };
                        }
                      )
                    }
                    className="favorite-button">
                    <img
                      src={isFavorite(image.link) ? heart2 : heart1}
                      alt="Favorite"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </div>
              )
            )}
          </div>
          {searchTime && (
            <p style={{ color: "#53a064", fontWeight: "bold" }}>
              The search took {searchTime} seconds
            </p>
          )}
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
