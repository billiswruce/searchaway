import { useAuth0 } from "@auth0/auth0-react";
import { SearchBar } from "./SearchBar"; // Se till att sökvägen är korrekt
import LoginButton from "./LoginButton"; // Kontrollera att sökvägen är korrekt

export const Home = () => {
  const { isAuthenticated } = useAuth0();

  const handleSearch = (searchTerm: string) => {
    console.log("Sökterm:", searchTerm);
    // Implementera din logik här, som att uppdatera en lista baserat på söktermen eller utföra en API-förfrågan
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAuthenticated ? (
        <>
          <h1>Välkommen!</h1>
          <SearchBar onSearch={handleSearch} />
        </>
      ) : (
        <>
          <h1>Vänligen logga in!</h1>
          <LoginButton />
        </>
      )}
    </div>
  );
};
