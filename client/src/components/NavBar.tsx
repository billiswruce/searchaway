import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton"; // Kontrollera att sökvägen är korrekt
import LogoutButton from "./LogoutButton"; // Kontrollera att sökvägen är korrekt
// import ThemeToggleButton from "./ThemeToggleBtn";

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <img
              src={user?.picture}
              alt="Profilbild"
              style={{ marginRight: "8px" }}
            />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
        {/* <ThemeToggleButton /> */}
      </div>
    </nav>
  );
};

export default Navbar;
