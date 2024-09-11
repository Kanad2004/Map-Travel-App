const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const pinRoute = require("./routes/pin");
const userRoute = require("./routes/user");
dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/pin", pinRoute);
app.use("/api/user", userRoute);

app.listen(8000, () => {
  console.log("Backend server is running on port 8000");
});
