const { JWT_SECRET } = require("../config");
const express = require("express");
const { Course, Admin } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.create({
    username,
    password,
  });

  res.json({
    message: `You have successfully registered into our website, ${user._id}`,
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.find({
    username: username,
    password: password,
  });

  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(411).json({
      message: "Incorrect username or password",
    });
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});

  res.json({
    courses,
  });
});

router.post("/course", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const course = await Course.create({
    title,
    content,
    imageLink,
    price,
  });

  res.json({
    message: `You have successfully created a course, ${course._id}`,
  });
});

module.exports = router;
