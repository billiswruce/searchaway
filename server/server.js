const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const colors = require("colors");

const app = express();
app.use(cors());
app.use(express.json());

const usersFilePath = "users.json";

app.post("/users", async (req, res) => {
  try {
    const usersData = await fs.readFile(usersFilePath, "utf8");
    const users = JSON.parse(usersData);
    users.push(req.body);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    console.log("User data saved".green);
    res.status(201).json("Användare sparad");
  } catch (error) {
    console.error("Error saving user data:".red, error);
    res.status(500).send("Fel vid sparande av användare");
  }
});

app.listen(3000, () => console.log("Server is up...".rainbow.bold.italic));
