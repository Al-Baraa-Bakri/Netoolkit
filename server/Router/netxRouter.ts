import express, { Express, Request, Response } from 'express';
// import { createBuilding, createFloor, createProject, createRoom, deleteBuilding, deleteFloor, deleteProject, deleteRoom, getAllProjects, getBuilding, getFloor, getProject, updateBuilding, updateFloor, updateProject, updateRoom } from '../Controller/netxController';
import { createRoom , updateRoom , deleteRoom , getRoom } from '../Controller/Netx/rooms'
import { checkJwt } from '../middleware/auth';
import { createFloor, deleteFloor, getFloor, updateFloor } from '../Controller/Netx/floors';
import { createBuilding, deleteBuilding, getBuilding, updateBuilding } from '../Controller/Netx/buildings';
import { createProject, deleteProject, getProject, getUserProjects, updateProject } from '../Controller/Netx/project';
import { calculate } from '../Controller/Netx/calculating';
const router = express.Router();

router.route('/').get(getUserProjects).post(createProject); 
router.route('/:projectId').get(getProject).put(updateProject).delete(deleteProject);
// // Buildings
router.route('/building').post(createBuilding);
router.route('/building/:buildingId').get(getBuilding).put(updateBuilding).delete(deleteBuilding); 

// // Floors
router.route('/floor').post(createFloor);
router.route('/floor/:floorId').get(getFloor).put(updateFloor).delete(deleteFloor); 

// Rooms 
router.route('/room').post(createRoom); 
router.route('/room/:roomId').get(getRoom).put(updateRoom).delete(deleteRoom)

// Calculating 
router.route('/calculate/:projectId').get(calculate)
export default router;