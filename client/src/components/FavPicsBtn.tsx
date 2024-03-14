import { useNavigate } from "react-router-dom";
import heart2 from "../img/heart2.svg";

const FavPicsBtn = () => {
  const navigate = useNavigate();

  const navigateToFavorites = () => {
    navigate("/favorites"); // Navigera till /favorites sidan
  };

  return (
    <button
      onClick={navigateToFavorites}
      className="favorite-button"
      style={{
        border: "none",
        background: "none",
        padding: "0",
        cursor: "pointer",
      }}>
      <img src={heart2} alt="Favorites" className="navbar-heart" />
    </button>
  );
};

export default FavPicsBtn;
