require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DbConnect } = require("./database");

const app = express();
DbConnect();

const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/user");

app.use(cookieParser());
app.use(express.json());

app.use("/api", userRoutes);


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
