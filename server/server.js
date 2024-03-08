const colors = require("colors");
const express = require("express");
const cors = require("cors");
const { favPicSchema } = require("./schemas/favpic.schema");
const { readData, writeData } = require("./picsHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Funktion för att spara användares favoritbilder
async function saveFavorites(userId, favorites) {
  const data = await readData();
  const userIndex = data.findIndex((u) => u.userId === userId);

  if (userIndex > -1) {
    if (!data[userIndex].favorites) {
      data[userIndex].favorites = [];
    }
    data[userIndex].favorites.push(...favorites);
  } else {
    data.push({ userId, favorites });
  }

  await writeData(data);
}

app.post("/api/users/favorites", async (req, res) => {
  const { userId, favorites } = req.body;

  const { error } = favPicSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  await saveFavorites(userId, favorites);
  res.status(201).json({ message: "Favorite picture(s) saved successfully." });
});

app.get("/api/users/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  const data = await readData();
  const userData = data.find((u) => u.userId === userId);

  if (!userData || !userData.favorites) {
    return res
      .status(404)
      .json({ message: "User not found or no favorite pictures." });
  }

  res.json(userData.favorites);
});

app.listen(3000, () => console.log("Server started on port 3000".rainbow.bold));
