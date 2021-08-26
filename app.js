import express from "express";
import mongoose from "mongoose";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const url ="mongodb+srv://dbUser:Og2BA67HCvADHkY4@cluster0.shjx0.mongodb.net/myFirstDB?retryWrites=true&w=majority";

const connectionParams={
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.get("/", (req, res) => {
  res.send("hello world");
  
});


app.listen(8080, () => {
  console.log("Server has started");
});