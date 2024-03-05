const express = require("express");
const app = express();

const pics = [
  {
    user: "user",
    favoritepic: [
      {
        title: "picture1",
        byteSize: 1000,
        url: "https://www.google.com",
      },
    ],
  },
  {
    user: "user2",
    favoritepic: [
      {
        title: "picture2",
        byteSize: 1000,
        url: "https://www.google.com",
      },
    ],
  },
  {
    user: "user3",
    favoritepic: [
      {
        title: "picture3",
        byteSize: 1000,
        url: "https://www.google.com",
      },
    ],
  },
];

app.get("/pics", (req, res) => {
  res.json(pics);
});

app.listen(3000, () => console.log("server started"));
