import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbModel from "./dbModel.js";
import fetch from "node-fetch";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

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


const tok = "https://public-apis-api.herokuapp.com/api/v1/auth/token";
let token;
let finalcategories = [];
let i = 1;

var globalData;
const keyfetch = async () => {
  try {
    const data = await axios(tok);
    globalData = data;
  } catch (err) {
    console.log(err);
  }
};

const show = async () => {
  await keyfetch();

  async function categoryfetch() {
    while (i < 9) {
      const api = `https://public-apis-api.herokuapp.com/api/v1/apis/categories?page=${i}`;

      await axios
        .get(api, {
          headers: { Authorization: `Bearer ${globalData.data.token}` },
        })
        .then((res) => {
          if (res.data.categories?.length === 0) {
            return;
          }
          finalcategories = finalcategories.concat(res.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });

      i++;
    }

    console.log(finalcategories);
  }

  categoryfetch();
};

show();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(8080, () => {
  console.log("Server has started");
});
