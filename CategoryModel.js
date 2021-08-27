import mongoose from "mongoose";
import dataSchema from "./dbModel";

const CategorySchema = mongoose.Schema({

    data:Array, 

});

export default mongoose.model("category", CategorySchema);