const FavPicsBtn = () => {
  const scrollToFavPics = () => {
    document.getElementById("FavPics")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button onClick={scrollToFavPics} className="favorite-button">
      Favorites
    </button>
  );
};

export default FavPicsBtn;
