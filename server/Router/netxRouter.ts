import express, { Express, Request, Response } from 'express';
import { createProject, getAllProjects } from '../Controller/netxController';
const router = express.Router();

router.route('/').get(getAllProjects).post(createProject); 

export default router;