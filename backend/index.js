require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(port);
