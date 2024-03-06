// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pics = [
//   {
//     user: "user",
//     favoritepic: [
//       {
//         title: "picture1",
//         byteSize: 1000,
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     user: "user2",
//     favoritepic: [
//       {
//         title: "picture2",
//         byteSize: 1000,
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     user: "user3",
//     favoritepic: [
//       {
//         title: "picture3",
//         byteSize: 1000,
//         url: "https://www.google.com",
//       },
//     ],
//   },
// ];

// app.use((req, res, next) => {});

// app.use(cors());
// app.use(express.json());

// app.get("/pics", (req, res) => {
//   res.json(pics);
// });

// app.listen(3001, () => console.log("server started"));

// const express = require("express");
// const cors = require("cors");
// const colors = require("colors");
// const { favPicSchema } = require("./schemas/favpic.schema");
// const app = express();

// app.use(cors());
// app.use(express.json());

// const pics = [];

// app.post("/api/user/savepic", (req, res) => {
//   const validateobj = favPicSchema.validate(req.body);
//   console.log(validateobj);

//   pics.push(req.body);
//   res.status(201).json(pics);
// });

// app.listen(3001, () => console.log("server started".rainbow.bold));

const colors = require("colors");
const express = require("express");
const cors = require("cors");
const { favPicSchema } = require("./schemas/favpic.schema");
const { readData, writeData } = require("./picsHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint för att spara en användares favoritbild
app.post("/api/user/savepic", async (req, res) => {
  // Validera inkommande data med Joi-schema
  const { error, value } = favPicSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Läs den befintliga datan från filen
  const data = await readData();
  const userIndex = data.findIndex((u) => u.user === value.user);

  // Uppdatera befintlig användare eller lägg till en ny
  if (userIndex > -1) {
    // Lägg till favoritbilder till den befintliga användaren
    data[userIndex].favoritePics.push(...value.favoritePics);
  } else {
    // Skapa en ny användare om den inte finns
    data.push(value);
  }

  // Skriv uppdateringen tillbaka till filen
  await writeData(data);
  res.status(201).json({ message: "Favorite picture saved successfully" });
});

// Endpoint för att hämta en användares favoritbilder
app.get("/api/user/:username/favorites", async (req, res) => {
  const { username } = req.params;

  // Läs den befintliga datan från filen
  const data = await readData();
  const userData = data.find((u) => u.user === username);

  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  // Svara med användarens favoritbilder
  res.json(userData.favoritePics);
});

app.listen(3001, () => console.log("server started".rainbow.bold));
