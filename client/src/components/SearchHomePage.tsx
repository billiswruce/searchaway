import { useAuth0 } from "@auth0/auth0-react";
import { SearchBar } from "./SearchBar"; // Se till att sökvägen är korrekt
import LoginButton from "./LoginButton"; // Kontrollera att sökvägen är korrekt
import searchImages from "../models/SearchImages"; // Justera sökvägen efter behov

export const SearchHomePage = () => {
  const { isAuthenticated } = useAuth0();

  const handleSearch = async (searchTerm: string) => {
    try {
      const results = await searchImages(searchTerm);
      console.log("Sökresultat:", results);
      // Här kan du vidare hantera sökresultaten, t.ex. visa dem i UI:t
    } catch (error) {
      console.error("Fel vid sökning:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAuthenticated ? (
        <>
          <h1>Search away!</h1>
          <SearchBar onSearch={handleSearch} />
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
