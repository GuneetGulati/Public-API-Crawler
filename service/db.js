import mongoose from "mongoose";

const url =
  "mongodb+srv://dbUser:Og2BA67HCvADHkY4@cluster0.shjx0.mongodb.net/myFirstDB?retryWrites=true&w=majority";

const connectionParams = {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

import category_model from "../models/dbModel";

const categories = category_model

export default categories