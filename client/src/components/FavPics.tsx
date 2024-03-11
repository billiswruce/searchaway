// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// import { FavPic } from "../models/FavPic";

export const FavPics = () => {
  // const { user } = useAuth0();
  // const [favoritePics, setFavoritePics] = useState<FavPic[]>([]);

  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     if (user) {
  //       try {
  //         // Antag att denna endpoint returnerar en array av FavPic objekt
  //         const response = await axios.get<FavPic[]>(
  //           `http://localhost:3000/users/${user.sub}/favorites`
  //         );
  //         setFavoritePics(response.data);
  //       } catch (error) {
  //         console.error("Error fetching favorite pictures:", error);
  //       }
  //     }
  //   };

  //   fetchFavorites();
  // }, [user]);

  return (
    <div>
      {/* <h2>My Favorites</h2>
      <div className="image-grid">
        {favoritePics.map((image, index) => (
          <div key={index}>
            <img src={image.link} alt={image.title} /> <p>{image.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FavPics;
