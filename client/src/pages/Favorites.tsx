import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import heart2 from "../img/heart2.svg";
import trash from "../img/trash.svg";

const Favorites = () => {
  const { user } = useAuth0();
  const [favoriteImages, setFavoriteImages] = useState<
    { title: string; link: string }[]
  >([]);
  const navigate = useNavigate();

  //useEffect hook som körs när komponenten renderas och när user.sub ändras
  useEffect(() => {
    if (!user || !user.sub) return;

    const userId = user.sub;
    const url = `http://localhost:3000/users/${userId}/favorites`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setFavoriteImages(response.data);
      } catch (error: any) {
        console.error(
          "There was a problem with the axios operation:",
          error.response ? error.response.data : error
        );
      }
    };

    fetchData();
  }, [user?.sub]); //körs när user.sub ändras

  return (
    <div>
      <img
        src={heart2}
        alt="Favorite"
        style={{ width: "40px", height: "40px" }}
      />
      <h2>Your Favorites!</h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        Go back to Search
      </button>
      <div className="image-grid2">
        {favoriteImages.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.link} alt={image.title} className="image" />
            <button
              // onClick={() => deleteFavorite(image.link)} //work in progress
              className="delete-button"
              style={{ alignSelf: "flex-end" }}>
              <img
                src={trash}
                alt="Delete"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
