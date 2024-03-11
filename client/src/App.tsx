import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { SearchHomePage } from "./components/SearchHomePage";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated } = useAuth0();

  const saveUserFavorites = async (
    userId: string | undefined,
    favorites: any[]
  ) => {
    if (!userId || favorites.length === 0) return; // Säkerställ att userId finns och att det finns favoritbilder att spara

    try {
      const response = await fetch(
        "http://localhost:3000/api/users/favorites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, favorites }), // Skicka userId och favoritbilder i förfrågans kropp
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Favorites saved successfully:", data);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Exempel på favoritbilder (att ersätta med dina egna favoritbilder)
      const favorites = [
        {
          title: "My Favorite Picture",
          byteSize: 1000,
          url: "https://www.example.com/image.jpg",
        },
      ];

      saveUserFavorites(user.sub, favorites); // Använd user.sub som identifierare
    }
  }, [user, isAuthenticated]); // Kör effekten när user eller isAuthenticated ändras

  return (
    <>
      <Navbar />
      <SearchHomePage results={[]} />
    </>
  );
}

export default App;
