import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    
    API:  String,
    Link: String,
    Description:String,    
    Auth: Boolean,
    Https: Boolean,
    Cors: Boolean,
    Category: String,
});

export default mongoose.model("datas", dataSchema);