const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
    },
    image: {
        type: String,
        default: "https://i.postimg.cc/y8tPrvnG/beach.jpg",
        set: (v) => v === "" ? "https://i.postimg.cc/y8tPrvnG/beach.jpg" : v,
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
    }
});