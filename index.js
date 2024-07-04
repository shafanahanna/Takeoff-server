import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userrouter from './routes/userroute.js'

dotenv.config();
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const port=5000

app.use("/user",userrouter)

app.listen(port, () => {
    console.log("server running on port");
  });