import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";
dotenv.config();

const CONNECT_URI = process.env.CONNECT_URI as string;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = mongoose.connect(CONNECT_URI, options as ConnectOptions);


export default connectDB;