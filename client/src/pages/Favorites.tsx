import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // Lägg till denna import

const Favorites = () => {
  const { user } = useAuth0();
  const [favoriteImages, setFavoriteImages] = useState<
    { title: string; link: string }[]
  >([]);
  const navigate = useNavigate(); // Använd useNavigate för att skapa en navigate-funktion

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
  }, [user?.sub]);

  return (
    <div>
      <h2>Your Favorites!</h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        Go back to search
      </button>{" "}
      <div className="image-grid">
        {favoriteImages.map((image, index) => (
          <div key={index}>
            <h3>{image.title}</h3>
            <img
              src={image.link}
              alt={image.title}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
