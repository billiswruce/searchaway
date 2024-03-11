const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const colors = require("colors");
const { favPicSchema } = require("./schemas/favpic.schema");
const joi = require("joi");

const app = express();
app.use(cors());
app.use(express.json());

const usersFilePath = "users.json";

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const usersData = await fs.readFile(usersFilePath, "utf8");
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
    const usersData = await fs.readFile(usersFilePath, "utf8");
    const users = JSON.parse(usersData);

    if (!users[userId]) {
      users[userId] = { favorites: [] };
    }

    // Kontrollera om bilden redan finns bland favoriterna
    const alreadyExists = users[userId].favorites.some(
      (fav) => fav.link === favorites.link
    );

    if (!alreadyExists) {
      users[userId].favorites.push(favorites);
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
      res.status(201).send("Favoritbild sparad");
    } else {
      // Hantera fallet där bilden redan finns
      res.status(409).send("Bilden finns redan som favorit");
    }
  } catch (error) {
    console.error("Fel vid sparande av favoritbild:", error);
    res.status(500).send("Serverfel vid sparande av favoritbild");
  }
});

app.listen(3000, () => console.log("Server is up...".rainbow.bold.italic));
