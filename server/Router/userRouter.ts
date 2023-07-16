import express, { Express, Request, Response } from 'express';
import { loginUser } from '../Controller/userController';
const router = express.Router();

router.route('/').get(loginUser); 

export default router;