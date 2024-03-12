import { useEffect } from "react";
import "../Home.css";
import Navbar from "../components/NavBar";
import { SearchHomePage } from "../components/SearchHomePage";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {}, [user, isAuthenticated]); // Kör effekten när user eller isAuthenticated ändras

  return (
    <>
      <Navbar />
      <SearchHomePage results={[]} />
    </>
  );
}

export default Home;
