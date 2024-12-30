const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/htttp-error");
const PlacesRoute = require("./Routes/places-routes");
const UserRoute = require("./Routes/users-routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const mongodb = process.env.MONGODB_CON;



app.use(bodyParser.json());


app.use((req,res,next)=>{

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers' , 'Origin , X-Requested-With , Content-Type , Accept , Authorization');
  res.setHeader('Access-Control-Allow-Methods' , 'GET , POST , PATCH , DELETE')


  next()
})

app.use("/api/places", PlacesRoute);
app.use("/api/users", UserRoute);

app.use((req, res) => {
  const Error = new HttpError("No Route defined", 404);
  throw Error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An Unexpected error occurred" });
});

mongoose
  .connect(mongodb)
  .then(() => {
    console.log("Database Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log("There was an error");
  });
