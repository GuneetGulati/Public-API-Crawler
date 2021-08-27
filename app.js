import express from "express";
import mongoose, { model } from "mongoose";
import cors from "cors";
import dbModel from "./models/dbModel.js";
import fetch from "node-fetch";
import axios from "axios";
import { show } from "./service/service.js";
import deasync from "deasync";
import categories from "./service/db.js";

const app = express();
app.use(express.json());
app.use(cors());

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
  categories.create(model, (err, data) => {
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
