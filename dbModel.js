import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  API: String,
  Link: String,
  Description: String,
  Auth: String,
  Https: Boolean,
  Cors: String,
  Category: String,
});

const category = mongoose.Schema({
  Name: String,
  ApiData: [dataSchema]
});

export default mongoose.model("datas", category);
