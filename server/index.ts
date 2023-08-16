import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connectDB';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import netxRouter from './Router/netxRouter';
import userRouter from './Router/userRouter';
import { checkJwt } from './middleware/auth';
import ip from 'ip';
import { calculateCIDRPrefix , calculateSubnetMask  } from 'ip-subnet-calculator';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;


//MiddleWares
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())


app.use('/api/user' , userRouter);
app.use('/api/netx' , netxRouter);
app.post('/api/protected' , checkJwt , (req: any , res: Response) => {
  
    res.status(200).json({
      msg: "You are damn", 
    })
})

app.post('/api/ipSubnet' , (req: Request , res: Response) => {
const { cidrSubnet } = req.body; 

if(!cidrSubnet) {
  return res.status(401).json({
    msg: "CidrSubnet not found"
  })
}
const subResult = ip.cidrSubnet(cidrSubnet)

res.status(201).json({
  subResult
})


})

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
