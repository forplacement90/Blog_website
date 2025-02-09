const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");

const MONGO_URL ="mongodb://127.0.0.1:27017/blog";

main()
.then(() => {
    console.log("DB connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});