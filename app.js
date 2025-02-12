const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Blog = require("./models/blog.js");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));


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
//       username: "rahul@12",
//           title: "Maldives Escape",
//           description: "Experience luxury overwater bungalows with crystal-clear waters.",
//           image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
//       created_at: new Date()
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

// New Route
app.get("/blogs/new", (req, res) => {
  res.render("./blogs/new.ejs");
});

// Create Route
app.post("/blogs", async (req, res) => {
  let { username, title, description, image } = req.body;
  const newBlog = new Blog({
    username: username,
    title: title,
    description: description,
    image: image,
    created_at: new Date(),
    
   
  });
    await newBlog.save();
    res.redirect("/blogs");
});

// Show Route
app.get("/blogs/:id", async (req, res) => {
  let {id} = req.params;
  const blog = await Blog.findById(id);
  
  res.render("blogs/show.ejs", {blog});
});

// Edit Route
app.get("/blogs/:id/edit", async (req, res) => {
  let {id} = req.params;
  const blog = await Blog.findById(id);
  res.render("blogs/edit.ejs", {blog});
});

//Update Route
app.put("/blogs/:id", async (req, res) => {
  let {id} = req.params;
  let { title, description, image } = req.body;
  const updated_at = new Date(Date.now());
  let updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, image, updated_at}, );
  console.log(updatedBlog);
  res.redirect(`/blogs/${id}`);
}); 





// Delete Route
app.delete("/blogs/:id", async (req, res) => {
  let {id} = req.params;
  let deletedBlog = await Blog.findByIdAndDelete(id);
  console.log(deletedBlog);
  res.redirect("/blogs");
});

