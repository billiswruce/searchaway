import { useEffect } from "react";
import "./App.css";

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/pics");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Fixa här: .json() är en metod och måste anropas
    console.log(data);
  } catch (error) {
    console.error("There was a problem with fetch operation:", error);
  }
};

function App() {
  useEffect(() => {
    fetchData();
  }, []); // Den tomma beroendearrayen gör att effekten endast körs en gång

  return <div></div>; // Eller din önskade JSX-struktur
}

export default App;
