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
  console.log("Hämtar favoritbilder för userId:", userId);
  try {
    console.log("Läser från users.json"); //läser från users.json asynkront med await
    const usersData = await fs.readFile(usersFilePath, "utf8"); //konverterar JSON till javascriptobjekt
    console.log("Läst data från users.json:", usersData.substring(0, 100));
    const users = JSON.parse(usersData); //hittar användaren med userId i users.json
    const userFavorites = users.find(
      (user) => user.userId === userId //söker igenom användarlistan för att hitta specifik user med userId
    )?.favorites;

    if (!userFavorites) {
      //om ingen användare hittas eller användaren inte har några favoritbilder
      return res
        .status(404)
        .send("Användaren hittades inte eller har inga favoritbilder.");
    }

    res.json(userFavorites); //skickar tillbaka användarens favoritbilder
  } catch (error) {
    console.error("Fel vid hämtning av användarens favoritbilder:", error);
    res.status(500).send("Serverfel vid hämtning av användarens favoritbilder");
  }
});

app.post("/users", async (req, res) => {
  ///rutt för att lägga till eller uppdatera användares favoritbilder
  const { error } = favPicSchema.validate(req.body); //validerar inkommande data mot FavPicSchema
  if (error) {
    //om det finns fel i inkommande data
    return res.status(400).send(error.details[0].message);
  }
  const { userId, favorites } = req.body; //hämtar userId och favorites från inkommande data
  try {
    console.log("Läser från users.json för uppdatering"); //läser från users.json asynkront med await
    const usersData = await fs.readFile(usersFilePath, "utf8");
    let users = JSON.parse(usersData);

    let userIndex = users.findIndex((user) => user.userId === userId); //söker efter användare med userId i users.json
    if (userIndex === -1) {
      console.log(`Lägger till ny användare med userId: ${userId}`);
      users.push({ userId, favorites: favorites }); //om ej finns läggs användaren till i users.json
    } else {
      console.log(`Uppdaterar befintliga favoriter för userId: ${userId}`);
      users[userIndex].favorites.push(...favorites); //om användaren finns uppdateras favoritbilderna
    }

    console.log(
      "Uppdaterar users.json med data:",
      JSON.stringify(users, null, 2).substring(0, 100) //substring visar endast de första 100 tecknen
    ); //(users, null, 2 betyder att vi skriver ut med 2 spaces för att göra det mer läsbart)
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2)); //skriver till users.json asynkront med await och uppdaterar listan
    res.status(201).send("Favoritbild sparad, woo!"); //skickar tillbaka status 201 om allt gick bra
  } catch (error) {
    console.error("Fel vid sparande av favoritbild:", error);
    res.status(500).send("Serverfel vid sparande av favoritbild");
  }
});

app.listen(3000, () => console.log("Server is up...".rainbow.bold.italic));
