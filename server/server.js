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

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pics = [];

app.post("/api/user/pics/save", (req, res) => {
  pics.push(req.body);
  res.status(201).json(pics);
});

app.listen(3001, () => console.log("server started"));
