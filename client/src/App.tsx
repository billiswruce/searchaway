import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { SearchHomePage } from "./components/SearchHomePage";

//asynkron datahämtning från servern med fetch och async/await och errorhantering.
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/user/savepic");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with fetch operation:", error);
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
