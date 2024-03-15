const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const { favPicSchema } = require("./schemas/favpic.schema");
const joi = require("joi");
const colors = require("colors");

const app = express();
app.use(cors());
app.use(express.json());

const usersFilePath = "users.json";

app.get(`/users/:userId/favorites`, async (req, res) => {
  const { userId } = req.params; //hämtar :userId-parametern från URL
  console.log("Server/Fetching favorite images for userId:", userId);
  try {
    console.log("Server/Reading from users.json"); //läser från users.json asynkront med await
    const usersData = await fs.readFile(usersFilePath, "utf8"); //konverterar JSON till javascriptobjekt
    console.log(
      "Server/Data read from users.json:",
      usersData.substring(0, 100)
    );
    const users = JSON.parse(usersData); //hittar användaren med userId i users.json
    const userFavorites = users.find(
      (user) => user.userId === userId //söker igenom användarlistan för att hitta specifik user med userId
    )?.favorites;

    if (!userFavorites) {
      //om ingen användare hittas eller användaren inte har några favoritbilder
      return res
        .status(404)
        .send("Server/User not found or has no favorite images.");
    }

    res.json(userFavorites); //skickar tillbaka användarens favoritbilder
  } catch (error) {
    console.error("Server/Error fetching user's favorite images:", error);
    res.status(500).send("Server error fetching user's favorite images");
  }
});

app.post("/users", async (req, res) => {
  console.log(
    "Server/Recieved request to add or update user's favorite images."
  );
  ///rutt för att lägga till eller uppdatera användares favoritbilder
  const { error, value } = favPicSchema.validate(req.body); //validerar inkommande data mot FavPicSchema
  if (error) {
    //om det finns fel i inkommande data
    return res.status(400).send(error.details[0].message);
  }
  console.log("Server/Validation succesful.", value);
  const { userId, favorites } = req.body; //hämtar userId och favorites från inkommande data
  try {
    console.log("Server/Reading from users.json for update"); //läser från users.json asynkront med await
    const usersData = await fs.readFile(usersFilePath, "utf8");
    let users = JSON.parse(usersData);

    let userIndex = users.findIndex((user) => user.userId === userId); //söker efter användare med userId i users.json
    if (userIndex === -1) {
      console.log(`Server/Adding new user with userId: ${userId}`);
      users.push({ userId, favorites: favorites }); //om ej finns läggs användaren till i users.json
    } else {
      console.log(`Server/Updating existing favorites for userId: ${userId}`);
      users[userIndex].favorites.push(...favorites); //om användaren finns uppdateras favoritbilderna
    }

    console.log(
      "Server/Updating users.json with data:",
      JSON.stringify(users, null, 2).substring(0, 100) //substring visar endast de första 100 tecknen
    ); //(users, null, 2 betyder att vi skriver ut med 2 spaces för att göra det mer läsbart)
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2)); //skriver till users.json asynkront med await och uppdaterar listan
    res.status(201).send("Server/Favorite image saved"); //skickar tillbaka status 201 om allt gick bra
  } catch (error) {
    console.error("Server/Error saving favorite image:", error);
    res.status(500).send("Server error saving favorite image");
  }
});

app.listen(3000, () => console.log("Server is up...".rainbow.bold.italic));
