import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connectDB';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import netxRouter from './Router/netxRouter';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;


//MiddleWares
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())



app.use('/api/netx' , netxRouter)

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
