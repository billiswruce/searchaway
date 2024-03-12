// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";

// const FavoriteDisplay = () => {
//   const { user } = useAuth0();
//   const [favoriteImages, setFavoriteImages] = useState<{ title: string }[]>([]);

//   useEffect(() => {
//     if (!user || !user.sub) return; // Kontrollerar att user och user.sub finns

//     const userId = user.sub; // Extraherar userId från user-objektet
//     const url = `http://localhost:3000/users/:userId/favorites`; // Dynamiskt bygger URL med användar-ID

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url); // Använder den dynamiskt byggda URL:en för förfrågan
//         setFavoriteImages(response.data);
//       } catch (error: any) {
//         console.error(
//           "There was a problem with the axios operation:",
//           error.response ? error.response.data : error
//         );
//       }
//     };

//     fetchData();
//   }, [user?.sub]); // Beroende på user.sub för att återköra effekten när användarinformationen ändras
// };

// export default FavoriteDisplay;
