import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { SearchHomePage } from "./components/SearchHomePage";

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/user/savepic");
    if (!response.ok) {
      // Här kan du använda response.status för att få den exakta statuskoden
      throw new Error(`Network response was not ok, status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Om du vill fånga upp fler detaljer från felobjektet
    console.error(
      "There was a problem with the fetch operation:",
      (error as Error).message
    );
  }
};

//useEffect kör bara fetchData en gång, när komponenten renderas för första gången pga beroendearrayen är tom.
function App() {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <SearchHomePage />
    </>
  );
}

export default App;
