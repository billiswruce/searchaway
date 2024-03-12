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
  const { userId } = req.params;
  console.log("Hämtar favoritbilder för userId:", userId);
  try {
    console.log("Läser från users.json");
    const usersData = await fs.readFile(usersFilePath, "utf8");
    console.log("Läst data från users.json:", usersData.substring(0, 100)); // Visa de första 100 tecknen för att undvika överflödig loggning
    const users = JSON.parse(usersData);
    const userFavorites = users.find(
      (user) => user.userId === userId
    )?.favorites;

    if (!userFavorites) {
      return res
        .status(404)
        .send("Användaren hittades inte eller har inga favoritbilder.");
    }

    res.json(userFavorites);
  } catch (error) {
    console.error("Fel vid hämtning av användarens favoritbilder:", error);
    res.status(500).send("Serverfel vid hämtning av användarens favoritbilder");
  }
});

app.post("/users", async (req, res) => {
  const { error } = favPicSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { userId, favorites } = req.body;
  try {
    console.log("Läser från users.json för uppdatering");
    const usersData = await fs.readFile(usersFilePath, "utf8");
    let users = JSON.parse(usersData);

    let userIndex = users.findIndex((user) => user.userId === userId);
    if (userIndex === -1) {
      console.log(`Lägger till ny användare med userId: ${userId}`);
      users.push({ userId, favorites: favorites });
    } else {
      console.log(`Uppdaterar befintliga favoriter för userId: ${userId}`);
      users[userIndex].favorites.push(...favorites);
    }

    console.log(
      "Uppdaterar users.json med data:",
      JSON.stringify(users, null, 2).substring(0, 100)
    ); // Visa de första 100 tecknen
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).send("Favoritbild sparad, woo!");
  } catch (error) {
    console.error("Fel vid sparande av favoritbild:", error);
    res.status(500).send("Serverfel vid sparande av favoritbild");
  }
});

app.listen(3000, () => console.log("Server is up...".rainbow.bold.italic));
