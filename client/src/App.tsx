import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar";

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/pics");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with fetch operation:", error);
  }
};

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
