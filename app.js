import express from "express";
import mongoose, { model } from "mongoose";
import cors from "cors";
import dbModel from "./models/dbModel.js";
import axios from "axios";
import { show } from "./service.js";
import deasync from "deasync";

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://dbUser:Og2BA67HCvADHkY4@cluster0.shjx0.mongodb.net/myFirstDB?retryWrites=true&w=majority";

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

deasync(show());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/senddata", function (req, res) {
  const body = req.body;
  console.log("body is", body);
 
  const model = {
    Name : body[0].Category,
    ApiData : body
  }
  dbModel.create(model, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.listen(8080, () => {
  console.log("Server has started");
});
