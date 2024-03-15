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
  try {
    const usersData = await fs.readFile(usersFilePath, "utf8");
    const users = JSON.parse(usersData);
    const userFavorites = users.find(
      (user) => user.userId === userId
    )?.favorites;

    if (!userFavorites) {
      return res
        .status(404)
        .send("Server/User not found or has no favorite images.");
    }

    res.json(userFavorites);
  } catch (error) {
    res.status(500).send("Server error fetching user's favorite images");
  }
});

app.post("/users", async (req, res) => {
  const { error, value } = favPicSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { userId, favorites } = req.body;
  try {
    const usersData = await fs.readFile(usersFilePath, "utf8");
    let users = JSON.parse(usersData);

    let userIndex = users.findIndex((user) => user.userId === userId);
    if (userIndex === -1) {
      users.push({ userId, favorites: favorites });
    } else {
      users[userIndex].favorites.push(...favorites);
    }

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).send("Server/Favorite image saved");
  } catch (error) {
    res.status(500).send("Server error saving favorite image");
  }
});

app.listen(3000, () => {});
