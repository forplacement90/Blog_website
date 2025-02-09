const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Blog = require("./models/blog.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const MONGO_URL ="mongodb://127.0.0.1:27017/blogweb";

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

// app.get("/testBlog", async (req, res) => {
//     let sampleBlog = new Blog({
//       // username: "sujit@28",
//       // title: "Goa Beach",
//       // description:
//       //     "Enjoy stunning ocean views and easy access to the beach.",
//       // image:
//       //     "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//       // created_at: new Date()
//     });

//     await sampleBlog.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

// Index Route
app.get("/blogs", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("./blogs/index.ejs", { allBlogs });
});