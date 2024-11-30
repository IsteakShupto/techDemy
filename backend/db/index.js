require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: String,
  password: String,
});

const userSchema = new Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const courseSchema = new Schema({
  title: String,
  content: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
