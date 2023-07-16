import { Request , Response } from 'express';
import AsyncHandler from 'express-async-handler'; 
import axios from 'axios'; 


const loginUser = AsyncHandler(async (req: Request , res: Response) => {
    res.send("We will login your user"); 
})

export {
    loginUser
}