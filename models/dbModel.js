import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  API: String,
  Link: String,
  Description: String,
  Auth: String,
  HTTPS: Boolean,
  Cors: String,
  Category: String,
});

const category = mongoose.Schema({
  Name: String,
  ApiData: [dataSchema],
});

const category_model = mongoose.model("Categories", category);

export default category_model;
