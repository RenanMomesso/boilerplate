const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const config = require("./config/key");
require("dotenv").config()


//import routes
const authRouter = require('./routes/auth')

//db connection
mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("connected")
);

//midlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));


//routes config
app.use('/api', authRouter);




app.listen(3000, console.log("funcionando"));
