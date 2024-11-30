const { JWT_SECRET } = require("../config");
const express = require("express");
const { Course, User } = require("../db");
const { userMiddleware } = require("../middlewares/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.create({ username: username, password: password });

  res.json({
    message: `You have successfully registered into our website, ${user._id}`,
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);

  const user = await User.find({ username: username, password: password });

  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(411).json({
      message: "Incorrect username or password",
    });
  }
});

router.post("/purchase/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  const user = await User.updateOne(
    { username: req.username },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.json({
    user,
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const purchasedCourses = await User.find({ username: req.username });

  res.json({
    purchasedCourses: purchasedCourses[0].purchasedCourses,
  });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});

  res.json({
    courses,
  });
});

module.exports = router;
