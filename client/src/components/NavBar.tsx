import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton"; // Kontrollera att sökvägen är korrekt
import { FavPics } from "./FavPics";
// import ThemeToggleButton from "./ThemeToggleBtn";

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0(); //hämtar user, isAuthenticated och isLoading från Auth0

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // om true visas profilbild och logga ut knapp hämtat från auth0
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAuthenticated && (
          <>
            <img
              src={user?.picture}
              alt="Profilbild"
              style={{ marginRight: "8px" }}
            />
            <LogoutButton />
            <FavPics />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
