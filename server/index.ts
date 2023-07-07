import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connectDB';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const start = async () => {
  await connectDB; 
  console.log("CONNECTED TO DB");
  
  app.listen(PORT || 5000 , () => {
    console.log("Server Is Running in Port" , PORT);
  })
}

start();
