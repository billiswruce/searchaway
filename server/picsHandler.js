const fs = require("fs").promises;
const filePath = "./data.json";

async function readData() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.error("Read error:", error);
    return [];
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Write error:", error);
  }
}

module.exports = { readData, writeData };
