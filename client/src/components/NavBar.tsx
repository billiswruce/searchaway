import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import FavPicsBtn from "./FavPicsBtn";

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
            <FavPicsBtn />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
