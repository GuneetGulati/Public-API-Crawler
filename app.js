import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbModel from "./dbModel.js";
import CategoryModel from "./CategoryModel.js";
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

setInterval(keyfetch, 270000);

const show = async () => {
  await keyfetch();

  async function categoryfetch() {
    while (i < 6) {
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

    for (let i = 0; i < 1; i++) {
      let currdata = {};
      const catlink = `https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=1&category=${finalcategories[i]}`;
      let arr = [];

      await axios
        .get(catlink, {
          headers: { Authorization: `Bearer ${globalData.data.token}` },
        })
        .then((res) => {
          currdata = res;
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(currdata.data);

      let currCount = currdata.data.count;
      let totalloop = currCount / 10 + 1;
      arr = arr.concat(currdata.data.categories);
      for (var j = 2; j < totalloop; j++) {
        let datadetail = `https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=${j}&category=${finalcategories[i]}`;
        await axios
          .get(datadetail, {
            headers: { Authorization: `Bearer ${globalData.data.token}` },
          })
          .then((resp) => {
            arr = arr.concat(resp.data.categories);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      (async () => {
        await axios.post("http://localhost:8080/senddata", arr).then();
      })();

      //console.log("succcccccccc",arr);
    }
  }
  categoryfetch();
};

show();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/senddata", function (req, res) {
  const body = req.body;
  console.log("body is", body);
  body["Name"]=
  dbModel.create(body, (err, data) => {
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
