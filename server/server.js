const color = require("colors");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users/favorites", (req, res) => {
  console.log("data.json", req.body);

  fs.readFile("data.json", "utf8", (err, fileData) => {
    if (err) {
      console.error("Det uppstod ett fel vid läsning av befintlig data:", err);
      return res
        .status(500)
        .send({ message: "Det uppstod ett fel vid sparande av data." });
    }

    const users = JSON.parse(fileData);

    users.push(req.body);

    fs.writeFile("data.json", JSON.stringify(users), (writeErr) => {
      if (writeErr) {
        console.error("Det uppstod ett fel vid sparande av data:", writeErr);
        return res
          .status(500)
          .json({ message: "Det uppstod ett fel vid sparande av data." });
      }
      res.status(201).json({ message: "Data sparades framgångsrikt." });
    });
  });
});

app.listen(3000, () => console.log("Server started on port 3000".rainbow.bold));
