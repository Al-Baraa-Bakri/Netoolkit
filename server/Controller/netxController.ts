import { Request , Response } from 'express';
import AsyncHandler from 'express-async-handler'; 
import axios from 'axios'; 


const getAllProjects = AsyncHandler(async (req: Request , res: Response) => {
    res.send("We will return all netx projects"); 
})

export {
    getAllProjects
}