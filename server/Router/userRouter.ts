import express, { Express, Request, Response } from 'express';
import { registerUser } from '../Controller/userController';
const router = express.Router();

router.route('/').post(registerUser); 

export default router;