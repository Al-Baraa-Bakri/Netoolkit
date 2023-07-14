import express, { Express, Request, Response } from 'express';
import { getAllProjects } from '../Controller/netxController';
const router = express.Router();

router.route('/').get(getAllProjects); 

export default router;