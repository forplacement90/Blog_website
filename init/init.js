const mongoose = require("mongoose");
const initData = require("./data.js");
const Blog = require("../models/blog.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/blogweb";

main()
.then(() => {
    console.log("DB connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
      // Clear existing data
      await Blog.deleteMany({});
      console.log("Existing data cleared.");
      // Insert the updated data into the database
      await Blog.insertMany(initData.data);
      console.log("Data was initialized.");
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };
  
  initDB();
  
  