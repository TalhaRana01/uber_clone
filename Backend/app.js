const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/dbConn");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/users", userRoutes);

// Connect to Database
connectDB();

module.exports = app;
